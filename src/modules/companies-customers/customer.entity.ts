import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { EducationStagesEntity } from '../education-stages/education-stages.entity'
import { IncomeBracketEntity } from '../income-brackets/income-bracket.entity'
import { CompanyCustomerSegmentsEntity } from '../companies-customer-segments/company-customer-segments.entity'
import { CustomerProblemsEntity } from '../companies-customers-problems/customer-problems.entity'
import { MarketPotentialsCustomerEntity } from '../companies-market-potential-customers/market-potentials-customer.entity'
import { GENDER, RELATIONSHIP_STATUS } from '../../common/enum_values'

@Entity('customers')
export class CustomerEntity extends AbstractEntity {
    @Column('varchar',{ length: 255})
    title: string

    @Column('int')
    minimum_age: number

    @Column('int')
    maximum_age: number
    
    @Column({
      type: 'enum',
      enum: GENDER,
      default: GENDER.male
    })
    sex: GENDER

    @Column({
      type: 'enum',
      enum: RELATIONSHIP_STATUS,
      default: RELATIONSHIP_STATUS.single
    })
    relationship_status: RELATIONSHIP_STATUS

    @Column('varchar',{ length: 100, nullable: true})
    occupation: string

    @Column('varchar',{ length: 30, nullable: true})
    color_code: string

    @Column('text', { nullable: true })
    general_description: string

    /* Many customers can belong to one COMPANY through the customer segement  */
    @ManyToOne(type => EducationStagesEntity, education_stage => education_stage.customers)
    education_stage: EducationStagesEntity

    /* Many customers can belong to one education_stages */
    @ManyToOne( type => IncomeBracketEntity, income_bracket => income_bracket.customers )
    income_bracket: IncomeBracketEntity

    /* Many customers can belong to one income_bracket */
    @ManyToOne( type => CompanyCustomerSegmentsEntity, company_customer_segment => company_customer_segment.customers )
    company_customer_segment: CompanyCustomerSegmentsEntity

    /* One customer can have many Problems entries */
    @OneToMany( type => CustomerProblemsEntity, customer_problem => customer_problem.customer )
    customer_problems: CustomerProblemsEntity[]

    /* One customer can elong to many market_potentials_customer entities */
    @OneToMany( type => MarketPotentialsCustomerEntity, market_potentials_customer => market_potentials_customer.customers )
    market_potentials_customers: MarketPotentialsCustomerEntity[]
}