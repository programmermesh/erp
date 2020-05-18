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
import { ConversationsMembersEntity } from './conversations-members.entity'

@Entity('company_networks')
export class CompanyNetworksEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string  

    /* Many network_connections can belong to one company */
    @ApiProperty({ description: 'This is the ID  of the company that owns the network' })
    @ManyToOne( type => CompanyEntity, company => company.company_networks)
    company: CompanyEntity

    /* Many connected_company_id can refer to one company id */
    @ApiProperty({ description: 'This is the ID of the company/business the company is connected to' })
    @ManyToOne( type => CompanyEntity, company => company.company_to_company_network)
    connected_company: CompanyEntity

    /* One company in a network can be a member of many conversations */
    @OneToMany( type => ConversationsMembersEntity, conversation_member => conversation_member.company_networks )
    conversations_members: ConversationsMembersEntity[]

    /*PENDING CONNECTION TO THE INVESTORS table*/

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}