import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesMilestonesController } from './companies-milestones.controller';
import { CompaniesMilestonesService } from './companies-milestones.service';
import { CompanyMilestonesEntity } from './company-milestones.entity'
import { CompanyEntity } from '../companies/company.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    CompanyMilestonesEntity,
    CompanyEntity
  ])],
  controllers: [CompaniesMilestonesController],
  providers: [CompaniesMilestonesService]
})
export class CompaniesMilestonesModule {}
