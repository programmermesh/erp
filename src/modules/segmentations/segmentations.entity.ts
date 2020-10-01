import { Entity, Column, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CUSTOMERS_SEGMENTS_CATEGORIES } from '../../common/enum_values'
import { CustomerSegmentationsEntity } from '../customer-segmentations/customer-segmentations.entity'

@Entity('segmentations')
export class SegmentationsEntity extends AbstractEntity{

    @Column('varchar',{ length: 255})
    title: string

    @Column({
        type: 'enum',
        enum: CUSTOMERS_SEGMENTS_CATEGORIES
    })
    category: CUSTOMERS_SEGMENTS_CATEGORIES

    /* ONE segmentation can have MANY customers segmentations entries*/
    @OneToMany( type => CustomerSegmentationsEntity, customer_segmentation => customer_segmentation.segmentation )
    customer_segmentations: CustomerSegmentationsEntity[]
}
