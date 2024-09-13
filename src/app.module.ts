import { Module } from '@nestjs/common';
import { CarController } from './app.controller';
import { CarService } from './app.service';

@Module({
  imports: [],
  controllers: [CarController],
  providers: [CarService],
})
export class AppModule {}
