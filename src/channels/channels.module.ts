import { Module } from '@nestjs/common';
import { ChannelsController } from './channels.controller';
import { DetailsModule } from './details/details.module';

@Module({
  controllers: [ChannelsController],
  imports: [DetailsModule]
})
export class ChannelsModule {}
