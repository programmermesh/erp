import { Module } from '@nestjs/common';
import { CompaniesConversationsMembersController } from './companies-conversations-members.controller';
import { CompaniesConversationsMembersService } from './companies-conversations-members.service';
import { ConversationsMembersEntity as ConversationsMember } from './conversations-members.entity'
import { NetworkConversationEntity as CompanyConversation } from '../companies-conversations/company-conversation.entity'
import { CompanyEntity as Company } from '../companies/company.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    Company,
    CompanyConversation,
    ConversationsMember
  ])],
  controllers: [CompaniesConversationsMembersController],
  providers: [CompaniesConversationsMembersService]
})
export class CompaniesConversationsMembersModule {}
