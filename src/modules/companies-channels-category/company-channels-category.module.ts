import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyChannelsCategoryService } from './company-channels-category.service';
import { CompanyChannelsCategoryController } from './company-channels-category.controller';
import { ChannelsEntity as Channel } from '../companies-channels/channels.entity'
import { UserEntity as User } from '../users/user.entity'
import { CategoryEntity as Category } from './category.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channel, User, Category
    ])
  ],
  providers: [CompanyChannelsCategoryService],
  controllers: [CompanyChannelsCategoryController]
})
export class CompanyChannelsCategoryModule {}
