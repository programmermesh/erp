import { Module } from '@nestjs/common';
import { CompaniesTeamMembersController } from './companies-team-members.controller';

@Module({
  controllers: [CompaniesTeamMembersController]
})
export class CompaniesTeamMembersModule {}
