import { Module } from '@nestjs/common';
import { CompaniesPhotosController } from './companies-photos.controller';

@Module({
  controllers: [CompaniesPhotosController]
})
export class CompaniesPhotosModule {}
