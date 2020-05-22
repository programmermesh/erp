import { Module } from '@nestjs/common';
import { CompaniesUserRolesController } from './companies-user-roles.controller';

@Module({
  controllers: [CompaniesUserRolesController]
})
export class CompaniesUserRolesModule {}
