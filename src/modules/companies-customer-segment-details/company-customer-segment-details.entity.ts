import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CustSegTypesSubcategoriesValueEntity } from '../customer-segm-type-subcategory-values/cust-seg-types-subcategories-value.entity'
import { CompanyCustomerSegmentsEntity } from '../companies-customer-segments/company-customer-segments.entity'

@Entity('company_customer_segments_details')
export class CompanyCustomerSegmentDetailsEntity extends AbstractEntity {

    @Column('varchar', { length: 255, nullable: false})
    title: string

    @Column('text', { nullable: true })
    general_details: string

    @Column('varchar', { length: 20 ,nullable: true })
    color_code: string

    @OneToMany(
        type => CustSegTypesSubcategoriesValueEntity,
        segment_details_in_subcategory_value => segment_details_in_subcategory_value.company_customer_segment_details
    )
    segment_details_in_subcategory_values: CustSegTypesSubcategoriesValueEntity[]
    
    @ManyToOne( type => CompanyCustomerSegmentsEntity, company_customer_segments => company_customer_segments.company_customer_segment_details )
    company_customer_segments: CompanyCustomerSegmentsEntity
}
