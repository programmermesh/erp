import { Module } from '@nestjs/common';
import { CompaniesMarketPotentialEstimatesCoverageController } from './companies-market-potential-estimates-coverage.controller';
import { CompaniesMarketPotentialEstimatesCoverageService } from './companies-market-potential-estimates-coverage.service';
import { PotentialsEstimateCoverageEntity } from './potentials-estimate-coverage.entity'
import { MarketPotentialEntity } from '../companies-market-potentials/market-potential.entity'
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([
    PotentialsEstimateCoverageEntity,
    MarketPotentialEntity
  ])],
  controllers: [CompaniesMarketPotentialEstimatesCoverageController],
  providers: [CompaniesMarketPotentialEstimatesCoverageService]
})
export class CompaniesMarketPotentialEstimatesCoverageModule {}
