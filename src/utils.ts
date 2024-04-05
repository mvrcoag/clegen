#! /usr/bin/env node

export function toPascalCase(input: string): string {
  const words = input.split(" ");

  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  return capitalizedWords.join("");
}

export function toCamelCase(input: string): string {
  const words = input.split(" ");

  const capitalizedWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase(); // Lowercase the first word
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });

  return capitalizedWords.join("");
}