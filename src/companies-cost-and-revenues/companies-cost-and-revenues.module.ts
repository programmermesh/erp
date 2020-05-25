import { Module } from '@nestjs/common';
import { CompaniesCostAndRevenuesController } from './companies-cost-and-revenues.controller';

@Module({
  controllers: [CompaniesCostAndRevenuesController]
})
export class CompaniesCostAndRevenuesModule {}
