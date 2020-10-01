import { Entity, Column, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CustomerSegTypeSubcategoryEntity } from '../customer-segm-type-subcategory/customer-seg-type-subcategory.entity'

@Entity('customer_segmentations_types')
export class CustomerSegmentationTypeEntity extends AbstractEntity {

    @Column('varchar', { length: 255, nullable: true, unique: true })
    title: string

    /* One customer segmentation type can have many subcategories */
    @OneToMany( type => CustomerSegTypeSubcategoryEntity, customer_seg_type_subcategory => customer_seg_type_subcategory.customer_segmentation_types )
    customer_seg_type_subcategories: CustomerSegTypeSubcategoryEntity[]

}

/**
 * demographic
 * geography
 * behavioral
 * psychographic
*/