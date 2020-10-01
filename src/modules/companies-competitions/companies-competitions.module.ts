import { Module } from '@nestjs/common';
import { CompaniesCompetitionsController } from './companies-competitions.controller';
import { CompaniesCompetitionsService } from './companies-competitions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from '../companies/company.entity'
import { CompetitorEntity } from './competitor.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    CompanyEntity,
    CompetitorEntity
  ])],
  controllers: [CompaniesCompetitionsController],
  providers: [CompaniesCompetitionsService]
})
export class CompaniesCompetitionsModule {}
