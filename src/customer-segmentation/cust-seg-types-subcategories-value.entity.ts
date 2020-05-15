import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CustomerSegTypeSubcategoryEntity } from './customer-seg-type-subcategory.entity'
import { CompanyCustomerSegmentDetailsEntity } from '../customer-segments/company-customer-segment-details.entity'

@Entity('customer_seg_types_subcategories_values')
export class CustSegTypesSubcategoriesValueEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the title of the subcategory value'})
    @Column('varchar', { length: 255, nullable: true, unique: true })
    value: string

    /* Many values can fall under one subcategory */
    @ManyToOne( type => CustomerSegTypeSubcategoryEntity, 
        customer_seg_type_subcategory => customer_seg_type_subcategory.subcategory_values )
    cust_seg_types_subcategories: CustomerSegTypeSubcategoryEntity

    /* Many subcategory values can be under one segment details entry */
    @ManyToOne( type => CompanyCustomerSegmentDetailsEntity,
        customer_segment_detail => customer_segment_detail.segment_details_in_subcategory_values )
    company_customer_segment_details: CompanyCustomerSegmentDetailsEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}