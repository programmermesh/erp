import { Entity, ManyToOne, Column } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { ConnectionGroupsEntity } from '../companies-connection-groups/connection-groups.entity'
import { CompanyEntity } from '../companies/company.entity'
import { ConnectionGroupsCategoryEntity } from '../companies-connection-groups-categories/company-connection-group-category.entity'

@Entity('connection_groups_lead_list')
export class ConnectionGroupsLeadListEntity extends AbstractEntity {

    @Column({ type:'text', nullable: true })
    notes: string

    /* Many connections_group_lead_list entry can belong to one group */
    @ManyToOne(type => ConnectionGroupsEntity, connection_group => connection_group.connection_groups_lead_lists )
    connection_group: ConnectionGroupsEntity

    /* A lead list can be in many connection groups  */
    @ManyToOne(type => CompanyEntity, company => company.lead_lists)
    lead_list_company: CompanyEntity

    /* A lead list can be in many connection groups  */
    @ManyToOne(type => ConnectionGroupsCategoryEntity, lead_list => lead_list.connection_groups_lead_lists)
    connection_group_category: ConnectionGroupsCategoryEntity
}