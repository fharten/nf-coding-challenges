"use strict";
class Vehicle {
    constructor(id, name) {
        this.velocity = 0;
        this.id = id;
        this.name = name;
    }
    brake() {
        this.velocity = 0;
        console.log(`${this.name} has braked. The velocity is now ${this.velocity} km/h.`);
    }
}
class Car2 extends Vehicle {
    accelerate(kmh) {
        const newVelocity = (this.velocity += kmh);
        console.log(`${this.name} is speeding up. The velocity is now ${newVelocity} km/h.`);
        return newVelocity;
    }
}
class Bicycle extends Vehicle {
    accelerate(kmh) {
        let newBikeVelocity = (this.velocity += kmh);
        if (newBikeVelocity > 35) {
            console.error("Are you crazy? We can't go faster than 35 km/h!");
            newBikeVelocity = 35;
            console.log(`${this.name} reached the maximum velocity of ${newBikeVelocity} km/h.`);
            return newBikeVelocity;
        }
        else {
            this.velocity = newBikeVelocity;
            console.log(`${this.name} is speeding up. The velocity is now ${newBikeVelocity} km/h.`);
            return newBikeVelocity;
        }
    }
}
const myCar2 = new Car2(1, 'Mustang');
const accelerating = myCar2.accelerate(50);
const acceleratingFurther = myCar2.accelerate(10);
const acceleratingEvenFurther = myCar2.accelerate(5);
const braking = myCar2.brake();
const acceleratingAgain = myCar2.accelerate(5);
const myBike = new Bicycle(1, 'Canyon');
const acceleratingBike = myBike.accelerate(24);
const acceleratingBikeFurther = myBike.accelerate(10);
const acceleratingBikeEvenFurther = myBike.accelerate(5);
const brakingBike = myBike.brake();
const acceleratingBikeAgain = myBike.accelerate(5);
