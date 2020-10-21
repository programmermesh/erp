import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesPerformanceIndicatorCostController } from './companies-performance-indicator-cost.controller';
import { CompaniesPerformanceIndicatorCostService } from './companies-performance-indicator-cost.service';
import { CompanyEntity as Company } from '../companies/company.entity'
import { PerformanceIndicatorCostEntity as  PerformanceIndicatorCost} from './cost.entity'
import { PerformanceIndicatorRevenueEntity as PerformanceIndicatorRevenue} from '../companies-performance-indicator-revenue/revenue.entity'
import { PerformanceIndicatorCustomerEntity as PerformanceIndicatorCustomer} from '../companies-performance-indicator-customers/customer.entity'

@Module({imports: [
  TypeOrmModule.forFeature([
    Company, PerformanceIndicatorCost, PerformanceIndicatorRevenue, PerformanceIndicatorCustomer
  ])
],
  controllers: [CompaniesPerformanceIndicatorCostController],
  providers: [CompaniesPerformanceIndicatorCostService]
})
export class CompaniesPerformanceIndicatorCostModule {}
