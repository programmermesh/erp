import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskAnalysisController } from './risk-analysis.controller';
import { RiskAnalysisService } from './risk-analysis.service';
import { RiskAnalysisEntity } from './risk-analysis.entity'
import { CompanyEntity } from '../../companies/company.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    CompanyEntity,
    RiskAnalysisEntity
  ])],
  controllers: [RiskAnalysisController],
  providers: [RiskAnalysisService]
})
export class RiskAnalysisModule {}
