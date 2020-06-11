import { Module } from '@nestjs/common';
import { CompaniesCostAndRevenuesController } from './companies-cost-and-revenues.controller';
import { CompaniesCostAndRevenuesService } from './companies-cost-and-revenues.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostAndRevenuesEntity } from './cost-and-revenues.entity'
import { CompanyEntity } from '../companies/company.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    CompanyEntity,
    CostAndRevenuesEntity
  ])],
  controllers: [CompaniesCostAndRevenuesController],
  providers: [CompaniesCostAndRevenuesService]
})
export class CompaniesCostAndRevenuesModule {}
