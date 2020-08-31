import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskAnalysisController } from './risk-analysis.controller';
import { RiskAnalysisService } from './risk-analysis.service';
import { RiskAnalysisEntity } from './risk-analysis.entity'
import { CompanyEntity } from '../../companies/company.entity'
import {CompanyRiskAnalysisUsersModule } from '../../companies-risk-analysis-users/company-risk-analysis-users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
      RiskAnalysisEntity
    ]),
    CompanyRiskAnalysisUsersModule
  ],
  controllers: [RiskAnalysisController],
  providers: [RiskAnalysisService]
})
export class RiskAnalysisModule {}
