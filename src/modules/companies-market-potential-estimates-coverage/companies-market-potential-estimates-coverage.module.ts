import { Module } from '@nestjs/common';
import { CompaniesMarketPotentialEstimatesCoverageController } from './companies-market-potential-estimates-coverage.controller';
import { CompaniesMarketPotentialEstimatesCoverageService } from './companies-market-potential-estimates-coverage.service';

@Module({
  controllers: [CompaniesMarketPotentialEstimatesCoverageController],
  providers: [CompaniesMarketPotentialEstimatesCoverageService]
})
export class CompaniesMarketPotentialEstimatesCoverageModule {}
