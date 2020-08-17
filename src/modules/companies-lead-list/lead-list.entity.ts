import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'
import { ConnectionGroupsLeadListEntity } from '../companies-connection-groups-leadlist/connection-groups-lead-list.entity'

@Entity('lead_list')
export class LeadListEntity extends AbstractEntity {

    // @Column('text', { nullable: true })
    // notes: string

    // /* Many leads can belong to one company */
    // @ManyToOne(type => CompanyEntity, company => company.lead_lists )
    // main_company: CompanyEntity

    // /* A Lead(copmany) can have many entries in the lead list table 
    // @ManyToOne(type => CompanyEntity, company => company.lead_lists_company )
    // added_lead_company: CompanyEntity*/

    // /* One lead list can be in many groups */
    // @OneToMany( type => ConnectionGroupsLeadListEntity, connection_groups_lead_list => connection_groups_lead_list.lead_list )
    // connection_groups_lead_lists: ConnectionGroupsLeadListEntity[]
}