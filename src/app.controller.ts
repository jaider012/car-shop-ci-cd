import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CarService, Car } from './app.service';

interface CarDto {
  make: string;
  model: string;
  year: number;
  price: number;
}

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  getAllCars(): Car[] {
    return this.carService.getAllCars();
  }

  @Get(':id')
  getCarById(@Param('id') id: string) {
    const car = this.carService.getCarById(Number(id));
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return car;
  }

  @Post()
  addCar(@Body() carDto: CarDto) {
    return this.carService.addCar(carDto);
  }

  @Put(':id')
  updateCar(@Param('id') id: string, @Body() carDto: Partial<CarDto>) {
    const updatedCar = this.carService.updateCar(Number(id), carDto);
    if (!updatedCar) {
      throw new NotFoundException('Car not found');
    }
    return updatedCar;
  }

  @Delete(':id')
  deleteCar(@Param('id') id: string) {
    const deleted = this.carService.deleteCar(Number(id));
    if (!deleted) {
      throw new NotFoundException('Car not found');
    }
    return { message: 'Car deleted successfully' };
  }
}
