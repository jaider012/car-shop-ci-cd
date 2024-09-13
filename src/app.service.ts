import { Injectable } from '@nestjs/common';

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
}

@Injectable()
export class CarService {
  private cars: Car[] = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Corolla',
      year: 2018,
      price: 18000,
    },
    {
      id: 2,
      make: 'Ford',
      model: 'Fusion',
      year: 2019,
      price: 22000,
    },
    {
      id: 3,
      make: 'Hyundai',
      model: 'Elantra',
      year: 2017,
      price: 15000,
    },
    {
      id: 4,
      make: 'LEXUS',
      model: 'Elantra',
      year: 2017,
      price: 153300,
    },
  ];
  getAllCars(): Car[] {
    return this.cars;
  }

  getCarById(id: number): Car | undefined {
    return this.cars.find((car) => car.id === id);
  }

  addCar(car: Omit<Car, 'id'>): Car {
    const newCar = { ...car, id: this.cars.length + 1 };
    this.cars.push(newCar);
    return newCar;
  }

  updateCar(id: number, carData: Partial<Car>): Car | undefined {
    const car = this.getCarById(id);
    if (car) {
      Object.assign(car, carData);
      return car;
    }
    return undefined;
  }

  deleteCar(id: number): boolean {
    const index = this.cars.findIndex((car) => car.id === id);
    if (index !== -1) {
      this.cars.splice(index, 1);
      return true;
    }
    return false;
  }
}
