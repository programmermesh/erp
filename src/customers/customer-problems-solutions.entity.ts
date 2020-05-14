import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CustomerProblemsEntity } from '../customers/customer-problems.entity'

@Entity('customer_problems_solutions')
export class CustomerProblemsSolutionsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    /* Many solutions can be related to ONE problem */
    @ApiProperty({ description: 'This is the id of the prolem the entry is associated to' })
    @ManyToOne(type => CustomerProblemsEntity, customer_problem => customer_problem.solutions )
    custom_problems: CustomerProblemsEntity

    @ApiProperty({ description: 'This is the summary of the customer problem solutions'})
    @Column('text', { nullable: true })
    description: string

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}