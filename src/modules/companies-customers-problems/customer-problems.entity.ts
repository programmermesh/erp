import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CustomerEntity } from '../companies-customers/customer.entity'
import { CustomerProblemsSolutionsEntity } from '../companies-customers-problems-solutions/customer-problems-solutions.entity'

@Entity('customer_problems')
export class CustomerProblemsEntity extends AbstractEntity {
  
  @Column('text', { nullable: false })
  title: string
  
  @Column('text', { nullable: true })
  description: string

  /* Many problems can be related to ONE customer */
  @ManyToOne(type => CustomerEntity, customer => customer.customer_problems)
  customer: CustomerEntity

  /* One problem can have many solutions */
  @OneToMany( type => CustomerProblemsSolutionsEntity, customer_problems_solutions => customer_problems_solutions.custom_problems )
  solutions: CustomerProblemsSolutionsEntity[]
}
