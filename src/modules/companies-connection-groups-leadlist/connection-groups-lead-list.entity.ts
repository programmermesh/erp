import { Entity, ManyToOne } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { ConnectionGroupsEntity } from '../companies-connection-groups/connection-groups.entity'
import { LeadListEntity } from '../companies-lead-list/lead-list.entity'
import { ConnectionGroupsCategoryEntity } from '../companies-connection-groups-categories/company-connection-group-category.entity'

@Entity('connection_groups_lead_list')
export class ConnectionGroupsLeadListEntity extends AbstractEntity {

    /* Many connections_group_lead_list entry can belong to one group */
    @ManyToOne(type => ConnectionGroupsEntity, connection_group => connection_group.connection_groups_lead_lists )
    connection_group: ConnectionGroupsEntity

    /* A lead list can be in many connection groups  */
    @ManyToOne(type => LeadListEntity, lead_list => lead_list.connection_groups_lead_lists)
    lead_list: LeadListEntity

    /****
     * I WILL CONSOLIDATE THE LEADLIST TABLE WITH THE CONNECTION GROUPS LEADLIST
     * 
     * ****/

    /* A lead list can be in many connection groups  */
    @ManyToOne(type => ConnectionGroupsCategoryEntity, lead_list => lead_list.connection_groups_lead_lists)
    connection_group_category: ConnectionGroupsCategoryEntity
}