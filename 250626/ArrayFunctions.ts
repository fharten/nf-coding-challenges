const list = [15, 6, 3213, 9, 0, 12, 8464, 1, 1264, 481, 186, 1031, 194];

const result = (input: number[]): number => {
  const sum = input
    .sort((a, b) => b - a)
    .map((num) => num * num)
    .slice(4, -2)
    .filter((num) => num % 4 !== 0)
    .reduce((a, b) => a + b);

  return sum;
};

console.log(result(list));
