import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRiskAnalysisUsersController } from './company-risk-analysis-users.controller';
import { CompanyRiskAnalysisUsersService } from './company-risk-analysis-users.service';
import { RiskAnalysisUserEntity as RiskAnalysisUser } from './risk-analysis-user.entity'
import { CompanyTeamMembersEntity as CompanyTeamMember } from '../companies-team-members/company-team-members.entity'
import { RiskAnalysisEntity as RiskAnalysis } from '../companies-risks/risk-analysis/risk-analysis.entity'

@Module({
  imports:[TypeOrmModule.forFeature([
    RiskAnalysis, CompanyTeamMember, RiskAnalysisUser
  ])],
  controllers: [CompanyRiskAnalysisUsersController],
  providers: [CompanyRiskAnalysisUsersService]
})
export class CompanyRiskAnalysisUsersModule {}
