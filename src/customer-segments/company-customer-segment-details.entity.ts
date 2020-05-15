import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CustSegTypesSubcategoriesValueEntity } from '../customer-segmentation/cust-seg-types-subcategories-value.entity'

@Entity('company_customer_segment_details')
export class CompanyCustomerSegmentDetailsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the title of the subcategory value'})
    @Column('varchar', { length: 255, nullable: true, unique: true })
    value: string

    @OneToMany( type => CustSegTypesSubcategoriesValueEntity,
        segment_details_in_subcategory_value => segment_details_in_subcategory_value.company_customer_segment_details )
    segment_details_in_subcategory_values: CustSegTypesSubcategoriesValueEntity[]

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}