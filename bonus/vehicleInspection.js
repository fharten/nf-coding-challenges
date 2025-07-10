"use strict";
class Car {
    constructor(numberOfTires = 4, numberOfDoors = 4, seatBelt = true, airbag = true) {
        this.numberOfTires = numberOfTires || 4;
        this.numberOfDoors = numberOfDoors || 5;
        this.seatBelt = seatBelt;
        this.airbag = airbag;
    }
    toString() {
        const string = 'This car has ' +
            this.numberOfTires +
            ' tires and ' +
            this.numberOfDoors +
            ' doors. ';
        if (!this.seatBelt && !this.airbag) {
            return string + 'There are neither seatbelts nor airbags in this car.';
        }
        if (this.seatBelt && !this.airbag) {
            return string + 'There are seatbelts but no airbags in this car.';
        }
        if (!this.seatBelt && this.airbag) {
            return string + 'There are no seatbelts but airbags in this car.';
        }
        return string + 'There are seatbelts aswell as airbags in this car.';
    }
    equals(otherCar) {
        const { numberOfTires, numberOfDoors, seatBelt, airbag } = otherCar;
        return (this.numberOfTires === numberOfTires &&
            this.numberOfDoors === numberOfDoors &&
            this.seatBelt === seatBelt &&
            this.airbag === airbag);
    }
}
class CarInspectionService {
    static hasFourTires(car) {
        return car.numberOfTires === 4;
    }
    static hasSeatBelt(car) {
        return car.seatBelt;
    }
    static hasAirbag(car) {
        return car.airbag;
    }
    static hasThreeOrFiveDoors(car) {
        return car.numberOfDoors === 3 || car.numberOfDoors === 5;
    }
    static checkCar(car) {
        if (this.hasFourTires(car) &&
            this.hasSeatBelt(car) &&
            this.hasAirbag(car) &&
            this.hasThreeOrFiveDoors(car))
            return true;
        return false;
    }
}
const myCar = new Car(2, 6, false, false);
console.log(myCar.toString());
const inspection = CarInspectionService.checkCar(myCar);
console.log(`Passed inspection? ${inspection}`);
