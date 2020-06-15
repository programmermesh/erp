import { Module } from '@nestjs/common';
import { RelationsController } from './relations.controller';
import { RelationsService } from './relations.service';
import { RelationEntity } from './relation.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ RelationEntity ])],
  controllers: [RelationsController],
  providers: [RelationsService]
})
export class RelationsModule {}
