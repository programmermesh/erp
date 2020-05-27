import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import { CrudValidationGroups } from '@nestjsx/crud';
import { CompanyEntity } from '../companies/company.entity'
import { CustomerSegmentEntity } from '../customer-segments/customer-segment.entity'
import { CustomerEntity } from '../../customers/customer.entity'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('company_customer_segments')
export class CompanyCustomerSegmentsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string 
    
    /* Many companies_customers_segments can belong to one customer_segment*/
    @ApiProperty({ description: 'This will be the ID of the customer_segment the field is assigned to' })
    @ManyToOne( type => CustomerSegmentEntity, customer_segment => customer_segment.company )
    company_segment: CustomerSegmentEntity
        
    /* Many customer_segments can belong to one company */
    @ApiProperty({ description: 'This will be the ID of the company the customer segment belongs to' })
    @ManyToOne(type => CompanyEntity , company => company.customer_segments )
    company: CompanyEntity

    /* One csutomer segement can have many customers assigned to it */
    @OneToMany( type => CustomerEntity, customer => customer.company_customer_segment )
    customers: CustomerEntity[]

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date

}