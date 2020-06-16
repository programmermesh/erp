import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesConversationsController } from './companies-conversations.controller';
import { CompaniesConversationsService } from './companies-conversations.service';
import { NetworkConversationEntity as CompanyConversation } from './company-conversation.entity'
import { CompanyEntity as Company } from '../companies/company.entity'
import { ConversationsMembersEntity as ConversationsMember } from '../companies-conversations-members/conversations-members.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    Company, CompanyConversation, ConversationsMember
  ])],
  controllers: [CompaniesConversationsController],
  providers: [CompaniesConversationsService]
})
export class CompaniesConversationsModule {}
