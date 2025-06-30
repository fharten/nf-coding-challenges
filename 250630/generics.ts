// 1. Generic Identity Function
// TODO: Make this function generic so it returns the same type as its input
function identity<T>(arg: T): T {
  return arg;
}

console.log(identity('testing'));

// 2. Generic Array Function
// TODO: Write a generic function that returns the first element of an array
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

console.log(getFirst([4, 6, 8]));

// 3. Generic Interface
// TODO: Turn this interface into a generic
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 }; // This should be allowed

// 4. Generic Constraint
// TODO: Only allow types that have a 'length' property
function printLength<T extends { length: number }>(item: T): number {
  return item.length;
}

console.log(printLength([4, 6, 7, 8, 45, 3124]));

// 5. Using Multiple Type Parameters
// TODO: Complete the function to return a key-value tuple
function createPair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

console.log(createPair('name', 'john'));

// 6. Generic with Default Type
// TODO: Provide a default type for the generic parameter
function wrapValue<T = string>(val: T): T[] {
  return [val];
}

const defaultWrapped = wrapValue('hello world'); // should infer type

// 7. Generic Utility Type
// TODO: Use Partial<T> to make all properties optional
type Todo = {
  title: string;
  completed: boolean;
};

type PartialTodo = Partial<Todo>;

// 8. Conditional Type with Generics
// TODO: Complete the type to return string if T extends string, else number
type TypeCheck<T> = T extends string ? string : number;

type A = TypeCheck<'hello'>; // string
type B = TypeCheck<42>; // number
