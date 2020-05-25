import { Module } from '@nestjs/common';
import { CompaniesMarketPotentialsController } from './companies-market-potentials.controller';

@Module({
  controllers: [CompaniesMarketPotentialsController]
})
export class CompaniesMarketPotentialsModule {}
