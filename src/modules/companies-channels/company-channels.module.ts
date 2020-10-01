import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyChannelsController } from './company-channels.controller';
import { CompanyChannelsService } from './company-channels.service';
import { ChannelsEntity as Channel } from './channels.entity'
import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channel, User, Company
    ])
  ],
  controllers: [CompanyChannelsController],
  providers: [CompanyChannelsService]
})
export class CompanyChannelsModule {}
