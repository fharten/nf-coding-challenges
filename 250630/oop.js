"use strict";
// 1. Creating Basic Classes
// Task: Define a class called `Car` with the following properties:
// - make (string)
// - model (string)
// - year (number)
// Add a method `getDetails()` that returns a string like: "2022 Toyota Corolla"
class Car {
    constructor(make, model, year) {
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
    constructor(accountNumber, balance) {
        this.balance = balance;
        this.accountNumber = accountNumber;
    }
    deposit(amount) {
        this.balance = this.balance + amount;
    }
    withdraw(amount) {
        this.balance = this.balance - amount;
    }
    getBalance() {
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
    constructor(email) {
        this._email = email;
    }
    get email() {
        return this._email;
    }
    set email(email) {
        if (email.includes('@'))
            this._email = email;
        else
            throw new Error('not a valid email address');
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
    constructor(name) {
        this.name = name;
    }
    getDetails() {
        return this.name;
    }
}
class Manager extends Employee {
    constructor(name, department) {
        super(name);
        this.department = department;
    }
    getDetails() {
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
    static circleArea(radius) {
        return this.PI * (radius * radius);
    }
}
MathHelper.PI = 3.14;
// Test
console.log(MathHelper.circleArea(5)); // Should log: 78.5
// 6. Abstract Classes
// Task: Create an abstract class `Shape` with:
// - abstract method `getArea(): number`
// - name: string
// Create subclasses `Rectangle` and `Circle` that implement getArea.
class Shape {
    constructor(name) {
        this.name = name;
    }
}
class Rectangle extends Shape {
    constructor(width, height) {
        super(Shape.name);
        this.height = height;
        this.width = width;
    }
    getArea() {
        return this.width * this.height;
    }
}
class Circle extends Shape {
    constructor(radius) {
        super(Shape.name);
        this.radius = radius;
    }
    getArea() {
        return MathHelper.circleArea(this.radius);
    }
}
// Test
const shapes = [new Rectangle(4, 5), new Circle(3)];
shapes.forEach((shape) => console.log(`${shape.name} area: ${shape.getArea()}`));
class Dog {
    constructor(name) {
        this.name = name;
        this.sound = 'Woof!';
    }
    makeSound() {
        return `${this.name} says ${this.sound}`;
    }
}
// Test
const dog = new Dog('Rex');
console.log(dog.makeSound()); // "Rex says Woof!"
// Your code
const add = (x, y) => {
    return x + y;
};
const multiply = (x, y) => {
    return x * y;
};
// Test
console.log(add(2, 3)); // 5
console.log(multiply(2, 3)); // 6
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    move(dx, dy) {
        (this.x = dx), (this.y = dy);
    }
}
// Test
const point = new Point(0, 0);
point.move(5, 3);
console.log(point); // Should show updated x and y
