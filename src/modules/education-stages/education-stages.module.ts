import { Module } from '@nestjs/common';
import { EducationStagesController } from './education-stages.controller';
import { EducationStagesService } from './education-stages.service';
import { EducationStagesEntity } from './education-stages.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ EducationStagesEntity ])],
  controllers: [EducationStagesController],
  providers: [EducationStagesService]
})
export class EducationStagesModule {}
