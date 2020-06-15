import { Entity, Column, ManyToOne } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CustomerProblemsEntity } from '../companies-customers-problems/customer-problems.entity'

@Entity('customer_problems_solutions')
export class CustomerProblemsSolutionsEntity extends AbstractEntity {

    @Column('text', { nullable: false})
    description: string

    /* Many solutions can be related to ONE problem */
    @ManyToOne(type => CustomerProblemsEntity, customer_problem => customer_problem.solutions )
    custom_problems: CustomerProblemsEntity
}