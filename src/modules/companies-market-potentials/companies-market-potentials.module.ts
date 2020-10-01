import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesMarketPotentialsController } from './companies-market-potentials.controller';
import { CompaniesMarketPotentialsService } from './companies-market-potentials.service';
import { CompanyEntity} from '../companies/company.entity'
import { UserEntity } from '../users/user.entity'
import { MarketPotentialEntity } from './market-potential.entity'
import { CustomerEntity as Customer } from '../companies-customers/customer.entity'
import { MarketPotentialsCustomerEntity as MarketPotentialsCustomer } from '../companies-market-potential-customers/market-potentials-customer.entity'
import { PotentialsEstimateCoverageEntity as PotentialsEstimateCoverage } from '../companies-market-potential-estimates-coverage/potentials-estimate-coverage.entity'


@Module({
  imports: [TypeOrmModule.forFeature([
    MarketPotentialEntity,
    UserEntity,
    CompanyEntity,
    Customer,
    MarketPotentialsCustomer,
    PotentialsEstimateCoverage
  ])],
  controllers: [CompaniesMarketPotentialsController],
  providers: [CompaniesMarketPotentialsService]
})
export class CompaniesMarketPotentialsModule {}
