import { Module } from '@nestjs/common';
import { CompaniesConversationsMembersController } from './companies-conversations-members.controller';

@Module({
  controllers: [CompaniesConversationsMembersController]
})
export class CompaniesConversationsMembersModule {}
