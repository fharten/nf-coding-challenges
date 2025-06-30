const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const doubleNumbers = (input: number[]): number[] => {
  return input.map((num) => num * 2);
};

console.log(doubleNumbers(numbers));

const words: string[] = [
  'Lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipisicing',
  'elit',
];

const filteredWords: string[] = words.filter((word: string) => word.length > 5);
console.log(filteredWords);

const sum: number = numbers.reduce((a, b) => a + b);
console.log(sum);

const greaterThanTen = (input: number): boolean => {
  return input > 10;
};

console.log(numbers.some(greaterThanTen));
