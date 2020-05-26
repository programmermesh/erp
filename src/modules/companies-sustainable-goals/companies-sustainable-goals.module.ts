import { Module } from '@nestjs/common';
import { CompaniesSustainableGoalsController } from './companies-sustainable-goals.controller';

@Module({
  controllers: [CompaniesSustainableGoalsController]
})
export class CompaniesSustainableGoalsModule {}
