import {  Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { ChannelsEntity } from '../companies-channels/channels.entity'
import { RelationshipEntity } from '../companies-channels-relationship/relationship.entity'

@Entity('companies_channels_categories')
export class CategoryEntity extends AbstractEntity {
    
    @Column('varchar',{ length: 255})
    name: string
        
    /* Many Categories can belong to one channel */
    @ManyToOne(type => ChannelsEntity , channels => channels.categories )
    channel: ChannelsEntity

    /*One category can have many relationships */
    @OneToMany(type => RelationshipEntity, relationships => relationships.category)
    relationships: RelationshipEntity[]
}
