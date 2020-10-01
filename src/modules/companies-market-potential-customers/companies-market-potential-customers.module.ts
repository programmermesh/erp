import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesMarketPotentialCustomersController } from './companies-market-potential-customers.controller';
import { CompaniesMarketPotentialCustomersService } from './companies-market-potential-customers.service';
import { MarketPotentialsCustomerEntity as MarketPotentialsCustomer } from './market-potentials-customer.entity'
import { MarketPotentialEntity as MarketPotential } from '../companies-market-potentials/market-potential.entity'
import { CustomerEntity as Customer } from '../companies-customers/customer.entity'

@Module({
  imports:[TypeOrmModule.forFeature([
    Customer, MarketPotential, MarketPotentialsCustomer
  ])],
  controllers: [CompaniesMarketPotentialCustomersController],
  providers: [CompaniesMarketPotentialCustomersService]
})
export class CompaniesMarketPotentialCustomersModule {}
