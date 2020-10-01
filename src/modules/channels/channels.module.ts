import { Module } from '@nestjs/common';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { ChannelEntity } from './channel.entity'
import { RelationEntity } from '../relations/relation.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ChannelsController],
  imports: [ TypeOrmModule.forFeature([ ChannelEntity, RelationEntity ])],
  providers: [ChannelsService]
})
export class ChannelsModule {}
