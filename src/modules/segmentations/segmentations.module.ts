import { Module } from '@nestjs/common';
import { SegmentationsController } from './segmentations.controller';
import { SegmentationsService } from './segmentations.service';
import { SegmentationsEntity as Segmentation } from './segmentations.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Segmentation])
  ],
  controllers: [SegmentationsController],
  providers: [SegmentationsService]
})
export class SegmentationsModule {}
