export type SearchParamValue = string | string[] | undefined;

/**
 * Next.js represents a repeated query parameter as an array. Security-sensitive
 * links must reject that ambiguity instead of accidentally throwing or choosing
 * one of several attacker-controlled values.
 */
export function singleSearchParam(value: SearchParamValue): string {
  return typeof value === "string" ? value : "";
}
