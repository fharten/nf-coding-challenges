var Car = /** @class */ (function () {
    function Car(numberOfTires, numberOfDoors, seatBelt, airbag) {
        if (numberOfTires === void 0) { numberOfTires = 4; }
        if (numberOfDoors === void 0) { numberOfDoors = 4; }
        if (seatBelt === void 0) { seatBelt = true; }
        if (airbag === void 0) { airbag = true; }
        this.numberOfTires = numberOfTires || 4;
        this.numberOfDoors = numberOfDoors || 5;
        this.seatBelt = seatBelt;
        this.airbag = airbag;
    }
    Car.prototype.toString = function () {
        var string = 'This car has ' +
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
    };
    Car.prototype.equals = function (otherCar) {
        var numberOfTires = otherCar.numberOfTires, numberOfDoors = otherCar.numberOfDoors, seatBelt = otherCar.seatBelt, airbag = otherCar.airbag;
        return (this.numberOfTires === numberOfTires &&
            this.numberOfDoors === numberOfDoors &&
            this.seatBelt === seatBelt &&
            this.airbag === airbag);
    };
    return Car;
}());
var CarInspectionService = /** @class */ (function () {
    function CarInspectionService() {
    }
    CarInspectionService.hasFourTires = function (car) {
        return car.numberOfTires === 4;
    };
    CarInspectionService.hasSeatBelt = function (car) {
        return car.seatBelt;
    };
    CarInspectionService.hasAirbag = function (car) {
        return car.airbag;
    };
    CarInspectionService.hasThreeOrFiveDoors = function (car) {
        return car.numberOfDoors === 3 || car.numberOfDoors === 5;
    };
    CarInspectionService.checkCar = function (car) {
        if (this.hasFourTires(car) &&
            this.hasSeatBelt(car) &&
            this.hasAirbag(car) &&
            this.hasThreeOrFiveDoors(car))
            return true;
        return false;
    };
    return CarInspectionService;
}());
var myCar = new Car(2, 6, false, false);
console.log(myCar.toString());
var inspection = CarInspectionService.checkCar(myCar);
console.log("Passed inspection? ".concat(inspection));
