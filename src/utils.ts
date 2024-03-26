#! /usr/bin/env node

export function toPascalCase(input: string): string {
  // Split the input string by spaces
  const words = input.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the words and return
  return capitalizedWords.join("");
}

export function toCamelCase(input: string): string {
  // Split the input string by spaces
  const words = input.split(" ");

  // Capitalize the first letter of each word except the first word
  const capitalizedWords = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase(); // Lowercase the first word
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });

  // Join the words and return
  return capitalizedWords.join("");
}
