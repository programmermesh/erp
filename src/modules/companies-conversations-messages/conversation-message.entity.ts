import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { NetworkConversationEntity } from '../companies-conversations/company-conversation.entity'
import { ConversationsMembersEntity } from '../companies-conversations-members/conversations-members.entity'

@Entity('conversations_messages')
export class ConversationMessageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string  

    /* Many network_conversation can belong to one company */
    @ApiProperty({ description: 'This is the ID  of the network conversation the message belongs to ' })
    @ManyToOne( type => NetworkConversationEntity, network_conversation => network_conversation.conversation_messages)
    network_conversations: NetworkConversationEntity

    @ApiProperty({ description: 'This is the posted message' })
    @Column('text', { nullable: true })
    message: string

    @ApiProperty({ description: 'The id of the writer of the message' })
    @ManyToOne( type => ConversationsMembersEntity, conversations_members => conversations_members.conversation_message )
    sent_by: ConversationsMembersEntity

    /* PENDING enum : read, archived, unread */
    @ApiProperty({ description: 'This is the status of the message' })
    @Column('varchar', { length: 10, default:'read' })
    status: string

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}