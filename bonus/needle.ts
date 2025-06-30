const needle: string[] = ['hay', 'junk', 'random', 'needle', 'more junk'];
const needle2: string[] = ['needle'];
const needle3: string[] = ['foo', 'bar', 'baz', 'needle', 'qux'];
const needle4: string[] = ['one', 'two', 'three', 'four', 'needle'];
const needle5: string[] = ['junk', 'more junk', 'needle', 'even more junk'];

const findNeedle = (input: string[]): string => {
  const needlePosition = input.findIndex((e) => e === 'needle');

  return `found the needle at position ${needlePosition}`;
};

console.log(findNeedle(needle));
console.log(findNeedle(needle2));
console.log(findNeedle(needle3));
console.log(findNeedle(needle4));
console.log(findNeedle(needle5));
