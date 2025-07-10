class Car {
  public numberOfTires: number;
  public numberOfDoors: number;
  public seatBelt: boolean;
  public airbag: boolean;

  constructor(
    numberOfTires: number = 4,
    numberOfDoors: number = 4,
    seatBelt: boolean = true,
    airbag: boolean = true,
  ) {
    this.numberOfTires = numberOfTires || 4;
    this.numberOfDoors = numberOfDoors || 5;
    this.seatBelt = seatBelt;
    this.airbag = airbag;
  }

  toString(): string {
    const string =
      'This car has ' +
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

  equals(otherCar: Car): boolean {
    const { numberOfTires, numberOfDoors, seatBelt, airbag } = otherCar;
    return (
      this.numberOfTires === numberOfTires &&
      this.numberOfDoors === numberOfDoors &&
      this.seatBelt === seatBelt &&
      this.airbag === airbag
    );
  }
}

class CarInspectionService {
  static hasFourTires(car: Car): boolean {
    return car.numberOfTires === 4;
  }

  static hasSeatBelt(car: Car): boolean {
    return car.seatBelt;
  }

  static hasAirbag(car: Car): boolean {
    return car.airbag;
  }

  static hasThreeOrFiveDoors(car: Car): boolean {
    return car.numberOfDoors === 3 || car.numberOfDoors === 5;
  }

  static checkCar(car: Car): boolean {
    if (
      this.hasFourTires(car) &&
      this.hasSeatBelt(car) &&
      this.hasAirbag(car) &&
      this.hasThreeOrFiveDoors(car)
    )
      return true;
    return false;
  }
}

const myCar = new Car(2, 6, false, false);
console.log(myCar.toString());

const inspection = CarInspectionService.checkCar(myCar);
console.log(`Passed inspection? ${inspection}`);
