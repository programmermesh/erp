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
import { CustomerSegmentationTypeEntity } from './customer-segmentation-type.entity'
import { CustSegTypesSubcategoriesValueEntity } from './cust-seg-types-subcategories-value.entity'

@Entity('customer_seg_types_subcategories')
export class CustomerSegTypeSubcategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the title of the customer segementation subcategory'})
    @Column('varchar', { length: 255})
    title: string

    /* Many subcategories can be under one segmentation_type */
    @ManyToOne( type => CustomerSegmentationTypeEntity, customer_segmentation_type => customer_segmentation_type.customer_seg_type_subcategories )
    customer_segmentation_types: CustomerSegmentationTypeEntity

    /* One subcategory can have many values associated to it */
    @OneToMany( type => CustSegTypesSubcategoriesValueEntity, subcategory_value => subcategory_value.cust_seg_types_subcategories  )
    subcategory_values: CustSegTypesSubcategoriesValueEntity[]

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}

/**
 * EXAMPLE
 * lifestyle
 * gender, usage, continent
*/