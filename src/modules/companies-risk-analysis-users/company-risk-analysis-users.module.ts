import { Module } from '@nestjs/common';
import { CompanyRiskAnalysisUsersController } from './company-risk-analysis-users.controller';
import { CompanyRiskAnalysisUsersService } from './company-risk-analysis-users.service';

@Module({
  controllers: [CompanyRiskAnalysisUsersController],
  providers: [CompanyRiskAnalysisUsersService]
})
export class CompanyRiskAnalysisUsersModule {}
