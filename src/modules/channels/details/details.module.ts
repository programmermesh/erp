import { Module } from '@nestjs/common';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';
import { ChannelDetailEntity as ChannelDetail} from './channel-detail.entity'
import { ChannelEntity as Channel } from '../channel.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ ChannelDetail, Channel ])] ,
  controllers: [DetailsController],
  providers: [DetailsService]
})
export class DetailsModule {}
