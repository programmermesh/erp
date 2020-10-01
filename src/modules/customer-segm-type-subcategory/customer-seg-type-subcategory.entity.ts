import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CustomerSegmentationTypeEntity } from '../customer-segmentation-type/customer-segmentation-type.entity'
import { CustSegTypesSubcategoriesValueEntity } from '../customer-segm-type-subcategory-values/cust-seg-types-subcategories-value.entity'

@Entity('customer_seg_types_subcategories')
export class CustomerSegTypeSubcategoryEntity extends AbstractEntity {

    @Column('varchar', { length: 255})
    title: string

    /* Many subcategories can be under one segmentation_type */
    @ManyToOne( type => CustomerSegmentationTypeEntity, customer_segmentation_type => customer_segmentation_type.customer_seg_type_subcategories )
    customer_segmentation_types: CustomerSegmentationTypeEntity

    /* One subcategory can have many values associated to it */
    @OneToMany( type => CustSegTypesSubcategoriesValueEntity, subcategory_value => subcategory_value.cust_seg_types_subcategories  )
    subcategory_values: CustSegTypesSubcategoriesValueEntity[]
}

/**
 * EXAMPLE
 * lifestyle
 * gender, usage, continent
*/