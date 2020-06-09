import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompaniesTeamMembersController } from './companies-team-members.controller';
import { CompanyTeamMembersEntity } from './company-team-members.entity'
import { CompaniesTeamMembersService } from './companies-team-members.service';
import { CompanyEntity } from '../companies/company.entity';
import { UserEntity } from '../users/user.entity'
import { AccessTypesEntity } from '../access-types/access-types.entity'
import { RolesEntity } from '../companies-user-roles/roles.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    CompanyTeamMembersEntity,
    CompanyEntity,
    UserEntity,
    RolesEntity,
    AccessTypesEntity
  ])],
  controllers: [CompaniesTeamMembersController],
  providers: [CompaniesTeamMembersService]
})
export class CompaniesTeamMembersModule {}
