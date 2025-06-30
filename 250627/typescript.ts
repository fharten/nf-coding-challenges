// Exercise 1: Basic Types and Interfaces

interface User {
  id: number;
  name: string;
  email: string;
}

const getUserInfo = (user: User): string => {
  return `User ${user.id}: ${user.name} (${user.email})`;
};

console.log(getUserInfo({ id: 2, name: 'Lukas', email: 'lukas@web.de' }));

// Exercise 2: Union Types and Optional Properties

type Status = 'active' | 'inactive' | 'pending';

interface Account {
  username: string;
  status: Status;
  lastLogin?: Date;
}

const isActive = (account: Account): boolean => {
  if (account.status === 'active') return true;
  return false;
};

console.log(isActive({ username: 'Joerg', status: 'inactive' }));
console.log(
  isActive({ username: 'Joerg', status: 'active', lastLogin: new Date() }),
);
console.log(isActive({ username: 'Joerg', status: 'pending' }));

// Exercise 3: Type Assertions

const getLength = (input: string | number): number => {
  if (typeof input === 'string') return input.length;
  return input;
};

console.log(getLength('helloimastring'));
console.log(getLength(7));

// Exercise 3: Type Assertions
interface StringMap {
  [key: string]: string;
}

const printValues = (obj: StringMap): void => {
  console.log(obj);
};

// Exercise 5: Higher-Order Functions
const applyOperation = (
  a: number,
  b: number,
  operation: (x: number, y: number) => number,
): number => {
  const result = operation(a, b);
  return result;
};

console.log(applyOperation(6, 8, (x: number, y: number): number => x + y));
console.log(applyOperation(2, 9, (x: number, y: number): number => x * y));
console.log(applyOperation(60, 8, (x: number, y: number): number => x / y));
console.log(applyOperation(56, 18, (x: number, y: number): number => x - y));

// Exercise 6: Combining Interfaces and Union Types

interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

type Shape = Square | Rectangle;

const getArea = (shape: Shape): number => {
  if (shape.kind === 'rectangle') return shape.height * shape.width;
  return shape.size * shape.size;
};

console.log(getArea({ kind: 'square', size: 40 }));
console.log(getArea({ kind: 'rectangle', height: 40, width: 4 }));

// Exercise 7: Optional Chaining and Nullish Coalescing (Bonus)

interface Profile {
  contact?: { email?: string };
}

const getEmail = (profile: Profile): string => {
  if (profile.contact?.email) return profile.contact.email;
  return 'No email provided';
};

console.log(getEmail({ contact: { email: 'lukas@web.de' } }));
console.log(getEmail({}));
