import { Module } from '@nestjs/common';
import { CompaniesMarketPotentialCustomersController } from './companies-market-potential-customers.controller';
import { CompaniesMarketPotentialCustomersService } from './companies-market-potential-customers.service';

@Module({
  controllers: [CompaniesMarketPotentialCustomersController],
  providers: [CompaniesMarketPotentialCustomersService]
})
export class CompaniesMarketPotentialCustomersModule {}
