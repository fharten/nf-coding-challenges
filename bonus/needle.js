"use strict";
const needle = ['hay', 'junk', 'random', 'needle', 'more junk'];
const needle2 = ['needle'];
const needle3 = ['foo', 'bar', 'baz', 'needle', 'qux'];
const needle4 = ['one', 'two', 'three', 'four', 'needle'];
const needle5 = ['junk', 'more junk', 'needle', 'even more junk'];
const findNeedle = (input) => {
    const needlePosition = input.findIndex((e) => e === 'needle');
    return `found the needle at position ${needlePosition}`;
};
console.log(findNeedle(needle));
console.log(findNeedle(needle2));
console.log(findNeedle(needle3));
console.log(findNeedle(needle4));
console.log(findNeedle(needle5));
