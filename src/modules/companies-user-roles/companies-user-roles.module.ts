import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompaniesUserRolesController } from './companies-user-roles.controller';
import { CompaniesUserRolesService } from './companies-user-roles.service';
import { RolesEntity } from './roles.entity'
import { CompanyEntity } from '../companies/company.entity';
import { UserEntity } from '../users/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity, CompanyEntity, UserEntity])],
  controllers: [CompaniesUserRolesController],
  providers: [CompaniesUserRolesService]
})
export class CompaniesUserRolesModule {}
