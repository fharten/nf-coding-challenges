// 1. Creating Basic Classes
// Task: Define a class called `Car` with the following properties:
// - make (string)
// - model (string)
// - year (number)
// Add a method `getDetails()` that returns a string like: "2022 Toyota Corolla"

class Car {
  make: string;
  model: string;
  year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getDetails() {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

// Test
const myCar = new Car('Toyota', 'Corolla', 2022);
console.log(myCar.getDetails());

// 2. Working with Access Modifiers
// Task: Create a `BankAccount` class with:
// - private balance: number
// - public readonly accountNumber: string
// - public deposit(amount: number): void
// - public withdraw(amount: number): void
// - public getBalance(): number

class BankAccount {
  private balance: number;
  public readonly accountNumber: string;

  constructor(accountNumber: string, balance: number) {
    this.balance = balance;
    this.accountNumber = accountNumber;
  }

  deposit(amount: number): void {
    this.balance = this.balance + amount;
  }

  withdraw(amount: number): void {
    this.balance = this.balance - amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

// Test
const account = new BankAccount('123ABC', 500);
account.deposit(200);
account.withdraw(100);
console.log(account.getBalance()); // Should log: 600

// 3. Getters and Setters
// Task: Create a `UserProfile` class with a private property `_email`.
// Use getter and setter for `email` with basic validation (must include '@').

class UserProfile {
  private _email: string;

  constructor(email: string) {
    this._email = email;
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    if (email.includes('@')) this._email = email;
    else throw new Error('not a valid email address');
  }
}

// Test
const user = new UserProfile('john@example.com');
console.log(user.email); // Should return valid email
//user.email = 'wrongemail'; // Should throw an error

// 4. Inheritance and Method Overriding
// Task: Create a base class `Employee` with:
// - name: string
// - getDetails(): string

// Create a derived class `Manager` that adds:
// - department: string
// - Overrides getDetails() to include department

class Employee {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  getDetails(): string {
    return this.name;
  }
}

class Manager extends Employee {
  department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  getDetails(): string {
    return `${this.name}, ${this.department}`;
  }
}

// Test
const manager = new Manager('Alice', 'Engineering');
console.log(manager.getDetails());

// 5. Static Members
// Task: Create a `MathHelper` class with:
// - static PI = 3.14
// - static method `circleArea(radius: number): number`

class MathHelper {
  static PI = 3.14;

  static circleArea(radius: number): number {
    return this.PI * (radius * radius);
  }
}

// Test
console.log(MathHelper.circleArea(5)); // Should log: 78.5

// 6. Abstract Classes
// Task: Create an abstract class `Shape` with:
// - abstract method `getArea(): number`
// - name: string

// Create subclasses `Rectangle` and `Circle` that implement getArea.

abstract class Shape {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract getArea(): number;
}

class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super('rectangle');
    this.height = height;
    this.width = width;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Circle extends Shape {
  radius: number;

  constructor(radius: number) {
    super('circle');
    this.radius = radius;
  }

  getArea(): number {
    return MathHelper.circleArea(this.radius);
  }
}

// Test
const shapes: Shape[] = [new Rectangle(4, 5), new Circle(3)];
shapes.forEach((shape) =>
  console.log(`${shape.name} area: ${shape.getArea()}`),
);

// 7. Interfaces and Class Implementation
// Task: Define an interface `Animal` with:
// - name: string
// - makeSound(): string

// Create a class `Dog` that implements `Animal`.

interface Animal {
  name: string;

  makeSound(): string;
}

class Dog implements Animal {
  name: string;
  sound: string;

  constructor(name: string) {
    this.name = name;
    this.sound = 'Woof!';
  }

  makeSound(): string {
    return `${this.name} says ${this.sound}`;
  }
}

// Test
const dog = new Dog('Rex');
console.log(dog.makeSound()); // "Rex says Woof!"

// 8. Function Interfaces
// Task: Define an interface `MathOperation` that describes a function:
// (x: number, y: number) => number

// Implement two variables `add` and `multiply` that match the interface.

interface MathOperation {
  (x: number, y: number): number;
}

// Your code
const add: MathOperation = (x, y) => {
  return x + y;
};
const multiply: MathOperation = (x, y) => {
  return x * y;
};

// Test
console.log(add(2, 3)); // 5
console.log(multiply(2, 3)); // 6

// 9. Interface vs Type Alias
// Task:
// - Create a type alias `Coordinates` with `x` and `y` properties.
// - Create an interface `Movable` with method `move(dx: number, dy: number): void`
// - Implement a class `Point` that uses both.

type Coordinates = {
  x: number;
  y: number;
};

interface Movable {
  move(dx: number, dy: number): void;
}

class Point implements Coordinates, Movable {
  x: number;
  y: number;
  dx?: number;
  dy?: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(dx: number, dy: number) {
    (this.x = dx), (this.y = dy);
  }
}

// Test
const point = new Point(0, 0);
point.move(5, 3);
console.log(point); // Should show updated x and y
