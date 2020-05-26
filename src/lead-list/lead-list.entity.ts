import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CompanyEntity } from '../modules/companies/company.entity'
import { ConnectionGroupsLeadListEntity } from './connection-groups-lead-list.entity'

@Entity('lead_list')
export class LeadListEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the notes field associated to the lead'})
    @Column('text', { nullable: true })
    notes: string

    /* Many leads can belong to one company */
    @ApiProperty({ description: 'This is the id of the company that owns the lead list' })
    @ManyToOne(type => CompanyEntity, company => company.lead_lists )
    main_company: CompanyEntity

    /* A Lead(copmany) can have many entries in the lead list table */
    @ApiProperty({ description: 'This is the id of the company the added to the lead list' })
    @ManyToOne(type => CompanyEntity, company => company.lead_lists_company )
    lead_company: CompanyEntity

    /* One lead list can be in many groups */
    @OneToMany( type => ConnectionGroupsLeadListEntity, connection_groups_lead_list => connection_groups_lead_list.lead_list )
    connection_groups_lead_lists: ConnectionGroupsLeadListEntity[]

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}