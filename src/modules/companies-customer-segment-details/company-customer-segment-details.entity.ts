import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { CustSegTypesSubcategoriesValueEntity } from '../customer-segm-type-subcategory-values/cust-seg-types-subcategories-value.entity'
import { CompanyCustomerSegmentsEntity } from '../companies-customer-segments/company-customer-segments.entity'

@Entity('company_customer_segments_details')
export class CompanyCustomerSegmentDetailsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the title of the company customer segment details '})
    @Column('varchar', { length: 255, nullable: false})
    title: string

    @ApiProperty({ description: 'This is the description of the description company customer segment details'})
    @Column('text', { nullable: true })
    details: string

    @OneToMany( type => CustSegTypesSubcategoriesValueEntity,
        segment_details_in_subcategory_value => segment_details_in_subcategory_value.company_customer_segment_details )
    segment_details_in_subcategory_values: CustSegTypesSubcategoriesValueEntity[]
    
    @ApiProperty({ description: "This is the ID of the company customer segments table" })
    @ManyToOne( type => CompanyCustomerSegmentsEntity, company_customer_segments => company_customer_segments.company_customer_segment_details )
    company_customer_segments: CompanyCustomerSegmentsEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}