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
import { CustomerEntity } from '../companies-customers/customer.entity'
import { CustomerProblemsSolutionsEntity } from '../companies-customers-problems-solutions/customer-problems-solutions.entity'

@Entity('customer_problems')
export class CustomerProblemsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    /* Many problems can be related to ONE customer */
    @ApiProperty({ description: 'This is the id of the customer the entry is associated to' })
    @ManyToOne(type => CustomerEntity, customer => customer.customer_problems)
    customer: CustomerEntity

    /* One problem can have many solutions */
    @OneToMany( type => CustomerProblemsSolutionsEntity, customer_problems_solutions => customer_problems_solutions.custom_problems )
    solutions: CustomerProblemsSolutionsEntity[]

    @ApiProperty({ description: 'This is the description of the customer problem'})
    @Column('text', { nullable: true })
    description: string

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}