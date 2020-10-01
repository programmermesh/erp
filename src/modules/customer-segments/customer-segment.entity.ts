import { Entity, Column, OneToMany } from 'typeorm'
import { IsNotEmpty, IsOptional } from 'class-validator';

import { CompanyCustomerSegmentsEntity } from '../companies-customer-segments/company-customer-segments.entity'
import { AbstractEntity } from '../../common/abstract.entity'

@Entity('customer_segments')
export class CustomerSegmentEntity extends AbstractEntity  { 

    @IsNotEmpty()
    @Column('varchar',{ length: 3, unique: true})
    initials: string
    
    @IsNotEmpty()
    @Column('varchar',{ length: 255})
    name: string
    
    @IsNotEmpty()
    @Column('varchar',{ length: 10})
    color_code: string
    
    @IsOptional()
    @Column('varchar', { length: 255, nullable: true })
    description: string

    /* One customer segment can have many company assigned to it*/
    @OneToMany( type => CompanyCustomerSegmentsEntity, system_data => system_data.customer_segment )
    system_data: CompanyCustomerSegmentsEntity[] 
}

/**
 * B2B - Business to business
 * B2C  - Business to consumer 
 * B2G  - Business to Government
 * C2C - Consumer to Consumer
 * G2C - Government to Consumer
 * G2B - Government to Business
 */