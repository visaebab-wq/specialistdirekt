import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const scratch = mkdtempSync(join(tmpdir(), "sd-booking-confirmation-"));
const bookingFile = join(scratch, "bookings.jsonl");
const secret = "synthetic-booking-secret-for-confirmation-test";
const id = "123e4567-e89b-12d3-a456-426614174000";
const signature = createHmac("sha256", secret).update(id).digest("hex").slice(0, 32);
const slot = "2030-01-05T09:00:00.000Z";

const record = {
  type: "created",
  id,
  slot,
  name: "Synthetic Patient",
  email: "patient@example.test",
  phone: "0700000000",
  message: "Synthetic medical note that must not render",
  bookingType: "adult",
  personnummer: "199001011234",
  priceSek: 2000,
  freeCancelHours: 3,
  status: "verified",
  createdAt: "2029-12-01T10:00:00.000Z",
  verifiedAt: "2029-12-01T10:00:00.000Z",
};
writeFileSync(bookingFile, JSON.stringify(record) + "\n", { mode: 0o600 });

async function openPort() {
  return await new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      server.close((error) => (error ? reject(error) : resolve(port)));
    });
  });
}

async function waitForServer(url) {
  let lastError;
  for (let attempt = 0; attempt < 80; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw lastError ?? new Error("Server did not start");
}

const port = await openPort();
const origin = `http://127.0.0.1:${port}`;
const child = spawn(
  process.execPath,
  [join(root, "node_modules", "next", "dist", "bin", "next"), "start", "-H", "127.0.0.1", "-p", String(port)],
  {
    cwd: root,
    env: {
      ...process.env,
      NODE_ENV: "production",
      BOOKING_LOG_FILE: bookingFile,
      BOOKING_SECRET: secret,
    },
    stdio: ["ignore", "pipe", "pipe"],
  },
);

let stderr = "";
child.stderr.setEncoding("utf8");
child.stderr.on("data", (chunk) => {
  stderr += chunk;
});

try {
  await waitForServer(`${origin}/boka-tid/bokad`);

  const anonymous = await fetch(`${origin}/boka-tid/bokad`);
  const anonymousHtml = await anonymous.text();
  assert.match(anonymousHtml, /Ingen ny bokning att visa/);
  assert.doesNotMatch(anonymousHtml, /Karl Johansgatan 100/);

  const invalid = await fetch(`${origin}/boka-tid/bokad`, {
    headers: { cookie: `sd-booking-receipt=${id}.${"0".repeat(32)}.sent` },
  });
  assert.match(await invalid.text(), /Ingen ny bokning att visa/);

  const confirmed = await fetch(`${origin}/boka-tid/bokad`, {
    headers: { cookie: `sd-booking-receipt=${id}.${signature}.sent` },
  });
  const html = await confirmed.text();
  const htmlWithoutReactTextMarkers = html.replace(/<!--.*?-->/g, "");
  assert.equal(confirmed.status, 200);
  assert.match(confirmed.headers.get("cache-control") ?? "", /private.*no-store/);
  assert.equal(confirmed.headers.get("referrer-policy"), "no-referrer");
  assert.match(confirmed.headers.get("x-robots-tag") ?? "", /noindex.*nofollow.*noarchive/);
  assert.match(html, /Din tid är bokad/);
  assert.match(html, /Dr Masoud Sorkhabi/);
  assert.match(html, /Specialist i ortopedi och ryggkirurgi/);
  assert.match(html, /Karl Johansgatan 100, 414 55 Göteborg/);
  assert.match(htmlWithoutReactTextMarkers, /2(?:&nbsp;|\u00a0|\s)000 kr/);
  assert.match(html, /betalas på plats vid besöket/);
  assert.match(html, /Avboka tiden/);
  assert.match(html, new RegExp(`/boka-tid/avboka\\?id=${id}(?:&amp;|&)sig=${signature}`));
  assert.doesNotMatch(html, /Synthetic Patient|patient@example\.test|199001011234|Synthetic medical note/);
  assert.doesNotMatch(html, /googletagmanager|google-analytics\.com|plausible\.io/);

  const failedMail = await fetch(`${origin}/boka-tid/bokad`, {
    headers: { cookie: `sd-booking-receipt=${id}.${signature}.failed` },
  });
  assert.match(await failedMail.text(), /bekräftelsemejlet kunde inte skickas/);

  console.log("booking confirmation page: privacy, details and security headers passed");
} finally {
  child.kill("SIGTERM");
  await new Promise((resolve) => {
    const timer = setTimeout(resolve, 3000);
    child.once("exit", () => {
      clearTimeout(timer);
      resolve();
    });
  });
  rmSync(scratch, { recursive: true, force: true });
}

if (
  child.exitCode !== null &&
  child.exitCode !== 0 &&
  child.exitCode !== 143 &&
  child.signalCode !== "SIGTERM"
) {
  throw new Error(`Next server failed (${child.exitCode}): ${stderr.slice(0, 1000)}`);
}
