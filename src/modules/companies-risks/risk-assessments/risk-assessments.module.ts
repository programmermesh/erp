import { Module } from '@nestjs/common';
import { RiskAssessmentsController } from './risk-assessments.controller';

@Module({
  controllers: [RiskAssessmentsController]
})
export class RiskAssessmentsModule {}
