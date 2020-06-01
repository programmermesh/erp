import { Module } from '@nestjs/common';
import { EducationStagesController } from './education-stages.controller';
import { EducationStagesService } from './education-stages.service';

@Module({
  controllers: [EducationStagesController],
  providers: [EducationStagesService]
})
export class EducationStagesModule {}
