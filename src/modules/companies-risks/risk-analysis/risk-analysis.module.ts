import { Module } from '@nestjs/common';
import { RiskAnalysisController } from './risk-analysis.controller';

@Module({
  controllers: [RiskAnalysisController]
})
export class RiskAnalysisModule {}
