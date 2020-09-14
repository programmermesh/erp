
import {  Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CategoryEntity } from '../companies-channels-category/category.entity'
import { CustomerEntity } from '../companies-customers/customer.entity'

@Entity('companies_channels_relationships')
export class RelationshipEntity extends AbstractEntity {
        
    /* Many Categories can belong to one channel */
    @ManyToOne(type => CategoryEntity , category => category.relationships )
    category: CategoryEntity

    /* Many Relationships can belong to one customer */
    @ManyToOne(type => CustomerEntity , customer => customer.channel_relationships )
    customer: CustomerEntity
    
}
