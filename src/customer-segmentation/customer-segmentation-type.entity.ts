import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CustomerSegTypeSubcategoryEntity } from './customer-seg-type-subcategory.entity'

@Entity('customer_segmentations_types')
export class CustomerSegmentationTypeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the title of the customer_segmentation_type'})
    @Column('varchar', { length: 255, nullable: true, unique: true })
    title: string

    /* One customer segmentation type can have many subcategories */
    @OneToMany( type => CustomerSegTypeSubcategoryEntity, customer_seg_type_subcategory => customer_seg_type_subcategory.customer_segmentation_types )
    customer_seg_type_subcategories: CustomerSegTypeSubcategoryEntity[]

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}

/**
 * demographic
 * geography
 * behavioral
 * psychographic
*/