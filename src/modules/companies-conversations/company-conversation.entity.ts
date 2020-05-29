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
import { CompanyEntity } from '../companies/company.entity'
import { ConversationMessageEntity } from '../companies-conversations-messages/conversation-message.entity'
import { ConversationsMembersEntity } from '../companies-conversations-members/conversations-members.entity'

@Entity('network_conversations')
export class NetworkConversationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string  

    /* Many network_conversation can belong to one company */
    @ApiProperty({ description: 'This is the ID  of the company that created the network' })
    @ManyToOne( type => CompanyEntity, company => company.network_converstaions)
    company: CompanyEntity

    /* A conversation can have many messages */
    @OneToMany( type => ConversationMessageEntity, conversation_messages => conversation_messages.network_conversations)
    conversation_messages: ConversationMessageEntity[]

    /* One conversation can be viewed by many members in a group */
    @OneToMany( type => ConversationsMembersEntity, conversation_member => conversation_member.network_conversations)
    conversation_members: ConversationsMembersEntity[]

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}