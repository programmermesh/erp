import { Module } from '@nestjs/common';
import { RiskAssessmentsController } from './risk-assessments.controller';
import { RiskAssessmentsService } from './risk-assessments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiskAssessmentEntity } from './risk-assessment.entity'
import { CompanyEntity } from '../../companies/company.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    RiskAssessmentEntity,
    CompanyEntity
  ])],
  controllers: [RiskAssessmentsController],
  providers: [RiskAssessmentsService]
})
export class RiskAssessmentsModule {}
