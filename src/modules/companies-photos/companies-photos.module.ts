import { Module } from '@nestjs/common';
import { CompaniesPhotosController } from './companies-photos.controller';
import { CompaniesPhotosService } from './companies-photos.service';
import { CompanyEntity } from '../companies/company.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ CompanyEntity ])] ,
  controllers: [CompaniesPhotosController],
  providers: [CompaniesPhotosService]
})
export class CompaniesPhotosModule {}
