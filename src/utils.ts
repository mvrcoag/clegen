#! /usr/bin/env node

export function normalizeInputToPascalCase(input: string): string {
  const words = input.toLowerCase().split(" ");

  const normalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const normalizedInput = normalizedWords.join("");

  return normalizedInput;
}

export function normalizeInputToCamelCase(input: string): string {
  const words = input.toLowerCase().split(" ");

  const firstWord = words[0].charAt(0).toLowerCase() + words[0].slice(1);

  const normalizedWords = [firstWord, ...words.slice(1)];

  const normalizedInput = normalizedWords.join("");

  return normalizedInput;
}
