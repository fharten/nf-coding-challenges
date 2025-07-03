"use strict";
// Factory Exercises
// 2. Shape Factory
class ShapeFactory {
    static create(shape) {
        switch (shape) {
            case 'circle':
                return new Circle();
            case 'square':
                return new Square();
            case 'triangle':
                return new Triangle();
            default:
                throw new Error('Please choose between circle, square or triangle.');
        }
    }
}
class Circle {
    draw() {
        const radius = 5;
        const diameter = radius * 2;
        for (let y = 0; y <= diameter; y++) {
            let row = '';
            for (let x = 0; x <= diameter; x++) {
                const dx = x - radius;
                const dy = y - radius;
                const distance = Math.sqrt(dx * dx + dy * dy);
                // Allow a small margin of error to form a "circle"
                if (distance > radius - 0.5 && distance < radius + 0.5) {
                    row += '*';
                }
                else {
                    row += ' ';
                }
            }
            console.log(row);
        }
    }
}
class Triangle {
    draw() {
        for (let i = 1; i <= 5; i++) {
            const spaces = ' '.repeat(5 - i);
            const stars = '* '.repeat(i);
            console.log(spaces + stars);
        }
    }
}
class Square {
    draw() {
        for (let i = 0; i < 5; i++)
            console.log('* '.repeat(5));
    }
}
const shape3 = ShapeFactory.create('square');
shape3.draw(); // Output: Drawing Circle
const shape = ShapeFactory.create('circle');
shape.draw(); // Output: Drawing Circle
const shape2 = ShapeFactory.create('triangle');
shape2.draw(); // Output: Drawing Circle
