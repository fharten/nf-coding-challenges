// 1. Generic Identity Function
// TODO: Make this function generic so it returns the same type as its input
function identity(arg) {
    return arg;
}
console.log(identity('testing'));
// 2. Generic Array Function
// TODO: Write a generic function that returns the first element of an array
function getFirst(arr) {
    return arr[0];
}
console.log(getFirst([4, 6, 8]));
var numberBox = { value: 42 }; // This should be allowed
// 4. Generic Constraint
// TODO: Only allow types that have a 'length' property
function printLength(item) {
    return item.length;
}
console.log(printLength([4, 6, 7, 8, 45, 3124]));
// 5. Using Multiple Type Parameters
// TODO: Complete the function to return a key-value tuple
function createPair(key, value) {
    return [key, value];
}
console.log(createPair('name', 'john'));
