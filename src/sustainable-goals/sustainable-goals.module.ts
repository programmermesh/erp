import { Module } from '@nestjs/common';
import { SustainableGoalsController } from './sustainable-goals.controller';

@Module({
  controllers: [SustainableGoalsController]
})
export class SustainableGoalsModule {}
