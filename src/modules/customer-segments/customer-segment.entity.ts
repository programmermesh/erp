import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { CompanyCustomerSegmentsEntity } from '../companies-customer-segments/company-customer-segments.entity'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('customer_segments')
export class CustomerSegmentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the unique customer segment name '})
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 255, unique: true})
    name: string
    
    @ApiProperty({ description: 'This is the unique color code for the segment '})
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 10, unique: true})
    color_code: string
    
    @ApiProperty({ description: 'Simple summary of what the field is' })
    @Column('varchar', { length: 255, nullable: true })
    @ApiPropertyOptional()
    description: string

    /* One customer segment can have many company assigned to it*/
    @OneToMany( type => CompanyCustomerSegmentsEntity, company => company.company_segment )
    company: CompanyCustomerSegmentsEntity[]

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}

/**
 * B2B - Business to business
 * B2C  - Business to consumer 
 * 2G  - Business to Government
 * C2C - Consumer to Consumer
 * G2C - Government to Consumer
 * G2B - Government to Business
 */