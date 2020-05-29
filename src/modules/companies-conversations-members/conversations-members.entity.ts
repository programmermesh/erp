import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { NetworkConversationEntity } from '../companies-conversations/company-conversation.entity'
import { CompanyEntity } from '../companies/company.entity'
import { ConversationMessageEntity } from '../companies-conversations-messages/conversation-message.entity'
 
@Entity('conversations_members')
export class ConversationsMembersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string  

    /* Many network_conversation can belong to one company */
    @ApiProperty({ description: 'This is the ID  of the network conversation the company is a member of ' })
    @ManyToOne( type => NetworkConversationEntity, network_conversation => network_conversation.conversation_members)
    network_conversations: NetworkConversationEntity

    /* Many conversations_member entry can be part of a single company network */
    @ApiProperty({ description: 'This is the ID  of the company ' })
    @ManyToOne( type => CompanyEntity, company => company.conversation_members )
    company: CompanyEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date

    /* One company in a conversation group can write many messages */
    @OneToMany( type => ConversationMessageEntity, conversation_message => conversation_message.sent_by )
    conversation_message: ConversationMessageEntity[]
}