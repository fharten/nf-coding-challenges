const tree = (input: number): void => {
  for (let i = 1; i <= input; i++) {
    const empty = ' '.repeat(input - i);
    const tree = '*'.repeat(2 * i - 1);
    console.log(empty + tree);
  }

  const trunk = ' '.repeat(input - 1);
  console.log(trunk + '*');
};

console.log(tree(5));
