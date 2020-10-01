import { Entity, Column, ManyToOne } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CustomerSegTypeSubcategoryEntity } from '../customer-segm-type-subcategory/customer-seg-type-subcategory.entity'
import { CompanyCustomerSegmentDetailsEntity } from '../companies-customer-segment-details/company-customer-segment-details.entity'

@Entity('customer_seg_types_subcategories_values')
export class CustSegTypesSubcategoriesValueEntity extends AbstractEntity {

    @Column('varchar', { length: 255 })
    value: string

    /* Many values can fall under one subcategory */
    @ManyToOne( 
        type => CustomerSegTypeSubcategoryEntity, 
        customer_seg_type_subcategory => customer_seg_type_subcategory.subcategory_values 
    )
    cust_seg_types_subcategories: CustomerSegTypeSubcategoryEntity

    /* Many subcategory values can be under one segment details entry */
    @ManyToOne( 
        type => CompanyCustomerSegmentDetailsEntity,
        customer_segment_detail => customer_segment_detail.segment_details_in_subcategory_values 
    )
    company_customer_segment_details: CompanyCustomerSegmentDetailsEntity
}
