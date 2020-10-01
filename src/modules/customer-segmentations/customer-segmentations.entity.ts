import { Entity, Column, ManyToOne } from 'typeorm'

import { CustomerEntity } from '../companies-customers/customer.entity'
import { SegmentationsEntity } from '../segmentations/segmentations.entity'
import { AbstractEntity } from '../../common/abstract.entity'

@Entity('customer_segmentation')
export class CustomerSegmentationsEntity extends AbstractEntity {

    @Column('text', { nullable: true})
    segment_value: string

    @Column({ nullable: true , type: 'varchar', array: true })
    segment_values: string[]
    
    @Column('text', { nullable: true})
    group_index: string
    
    /* MANY customer segmentations belong to ONE segmentation*/
    @ManyToOne( type => SegmentationsEntity , segmentation => segmentation.customer_segmentations, { onDelete: 'CASCADE' } )
    segmentation: SegmentationsEntity
        
    /* Many sustainable_goals can belong to one company */
    @ManyToOne(type => CustomerEntity , customer => customer.customer_segmentations, { onDelete: 'CASCADE' } )
    customer: CustomerEntity

}