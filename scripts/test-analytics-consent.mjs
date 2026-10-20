import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const sourceFile = new URL("../src/lib/analytics-consent.ts", import.meta.url);
const transpiled = ts.transpileModule(readFileSync(sourceFile, "utf8"), {
  fileName: "analytics-consent.ts",
  reportDiagnostics: true,
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
});

const syntaxErrors = (transpiled.diagnostics || []).filter(
  (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
);
assert.deepEqual(
  syntaxErrors.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")),
  [],
);

function loadConsentModule({
  cookieHeader = "",
  storedValue = null,
  setThrows = false,
  removeThrows = false,
  broadcastSupported = false,
} = {}) {
  let cookies = cookieHeader;
  let storage = storedValue;
  const cookieWrites = [];
  const events = [];
  const broadcasts = [];

  const document = {};
  Object.defineProperty(document, "cookie", {
    get() {
      return cookies;
    },
    set(serialized) {
      cookieWrites.push(serialized);
      const pair = serialized.split(";", 1)[0];
      const separator = pair.indexOf("=");
      const name = pair.slice(0, separator);
      const value = pair.slice(separator + 1);
      const remaining = cookies
        .split(";")
        .map((part) => part.trim())
        .filter(Boolean)
        .filter((part) => part.slice(0, part.indexOf("=")) !== name);

      if (!/(?:^|;)\s*Max-Age=0(?:;|$)/i.test(serialized)) {
        remaining.push(`${name}=${value}`);
      }
      cookies = remaining.join("; ");
    },
  });

  const window = {
    document,
    location: {
      protocol: "https:",
      hostname: "www.specialistdirekt.se",
      pathname: "/boka/ortoped-goteborg",
    },
    localStorage: {
      getItem() {
        return storage;
      },
      setItem(_key, value) {
        if (setThrows) throw new Error("set blocked");
        storage = value;
      },
      removeItem() {
        if (removeThrows) throw new Error("remove blocked");
        storage = null;
      },
      get length() {
        return 0;
      },
      key() {
        return null;
      },
    },
    dispatchEvent(event) {
      events.push(event);
      return true;
    },
  };

  class CustomEvent {
    constructor(type, init = {}) {
      this.type = type;
      this.detail = init.detail;
    }
  }

  class BroadcastChannel {
    constructor(name) {
      this.record = { name, message: null, closed: false };
      broadcasts.push(this.record);
    }
    postMessage(value) {
      this.record.message = value;
    }
    close() {
      this.record.closed = true;
    }
  }

  const module = { exports: {} };
  const context = {
    CustomEvent,
    document,
    exports: module.exports,
    module,
    window,
  };
  if (broadcastSupported) context.BroadcastChannel = BroadcastChannel;
  vm.runInNewContext(transpiled.outputText, context);

  return {
    api: module.exports,
    broadcasts,
    cookieWrites,
    events,
    getCookieHeader: () => cookies,
    getStoredValue: () => storage,
  };
}

{
  const env = loadConsentModule({
    cookieHeader: "cookie-consent-v2=granted; cookie-consent-v2=denied",
    storedValue: "granted",
  });
  assert.equal(env.api.readAnalyticsConsentCookie(), "denied");
  assert.equal(env.api.readAnalyticsConsent(), "denied");
}

{
  const env = loadConsentModule({
    cookieHeader: "cookie-consent-v2=denied",
    storedValue: "corrupt",
  });
  assert.equal(env.api.readAnalyticsConsent(), null);
}

{
  const env = loadConsentModule({ storedValue: "granted" });
  assert.equal(env.api.readAnalyticsConsent(), null);
}

{
  const env = loadConsentModule({
    cookieHeader: "cookie-consent-v2=granted; _gac_test=1",
    storedValue: "granted",
    setThrows: true,
    broadcastSupported: true,
  });
  assert.equal(env.api.persistAnalyticsConsent("denied"), "denied");
  assert.equal(env.getStoredValue(), "granted");
  assert.equal(env.api.readAnalyticsConsent(), "denied");
  assert.match(env.getCookieHeader(), /(?:^|; )cookie-consent-v2=denied(?:;|$)/);
  assert.ok(env.cookieWrites.some((value) => value.startsWith("_gac_test=;")));
  assert.equal(env.events.at(-1)?.detail, "denied");
  assert.deepEqual(env.broadcasts.at(-1), {
    name: "specialistdirekt:analytics-consent-v1",
    message: "denied",
    closed: true,
  });
}

{
  const env = loadConsentModule({ storedValue: null, setThrows: true });
  assert.equal(env.api.persistAnalyticsConsent("granted"), "denied");
  assert.equal(env.api.readAnalyticsConsent(), null);
  assert.match(env.getCookieHeader(), /(?:^|; )cookie-consent-v2=denied(?:;|$)/);
}

{
  const env = loadConsentModule({
    cookieHeader: "cookie-consent-v2=granted",
    storedValue: "granted",
    removeThrows: true,
  });
  env.api.withdrawAnalyticsConsent();
  assert.equal(env.getStoredValue(), "granted");
  assert.equal(env.api.readAnalyticsConsent(), "denied");
  assert.match(env.getCookieHeader(), /(?:^|; )cookie-consent-v2=denied(?:;|$)/);
}

{
  const env = loadConsentModule({
    cookieHeader: "cookie-consent-v2=granted",
    storedValue: "granted",
  });
  env.api.withdrawAnalyticsConsent();
  assert.equal(env.getStoredValue(), null);
  assert.equal(env.api.readAnalyticsConsent(), null);
  assert.doesNotMatch(env.getCookieHeader(), /cookie-consent-v2=/);
}

console.log("analytics-consent static regression tests: 7 passed");
