/**
 * Convert string to PascalCase
 * e.g., "emergency-fund" -> "EmergencyFund"
 */
export function toPascalCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return word.toUpperCase();
    })
    .replace(/[\s-_]+/g, '');
}

/**
 * Convert string to camelCase
 * e.g., "emergency-fund" -> "emergencyFund"
 */
export function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}
