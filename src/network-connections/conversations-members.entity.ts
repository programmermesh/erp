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
import { NetworkConversationEntity } from './network-conversation.entity'
import { CompanyNetworksEntity } from '../modules/companies-connections/company-networks.entity'

@Entity('conversations_members')
export class ConversationsMembersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string  

    /* Many network_conversation can belong to one company */
    @ApiProperty({ description: 'This is the ID  of the network conversation the company is a member of ' })
    @ManyToOne( type => NetworkConversationEntity, network_conversation => network_conversation.conversation_members)
    network_conversations: NetworkConversationEntity

    /* Many conversations_member entry can be part of a single company network */
    @ApiProperty({ description: 'This is the ID  of the company network the company is a member of ' })
    @ManyToOne( type => CompanyNetworksEntity, company_network => company_network.conversations_members )
    company_networks: CompanyNetworksEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}