import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesPerformanceIndicatorRevenueController } from './companies-performance-indicator-revenue.controller';
import { CompaniesPerformanceIndicatorRevenueService } from './companies-performance-indicator-revenue.service';
import { CompanyEntity as Company } from '../companies/company.entity'
import { PerformanceIndicatorRevenueEntity as  PerformanceIndicatorRevenue} from './revenue.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company, PerformanceIndicatorRevenue
    ])
  ],
  controllers: [CompaniesPerformanceIndicatorRevenueController],
  providers: [CompaniesPerformanceIndicatorRevenueService]
})
export class CompaniesPerformanceIndicatorRevenueModule {}
