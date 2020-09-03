import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { EducationStagesEntity } from '../education-stages/education-stages.entity'
import { IncomeBracketEntity } from '../income-brackets/income-bracket.entity'
import { CompanyCustomerSegmentsEntity } from '../companies-customer-segments/company-customer-segments.entity'
import { CustomerProblemsEntity } from '../companies-customers-problems/customer-problems.entity'
import { MarketPotentialsCustomerEntity } from '../companies-market-potential-customers/market-potentials-customer.entity'
import { CustomerSegmentationsEntity } from '../customer-segmentations/customer-segmentations.entity'
import { CompanyEntity } from '../companies/company.entity'
import { CUSTOMERS_SEGMENTS } from '../../common/enum_values'

@Entity('customers')
export class CustomerEntity extends AbstractEntity {
    @Column('varchar',{ length: 255, nullable: true})
    name: string

    @Column({
      type: 'enum',
      enum: CUSTOMERS_SEGMENTS,
      default: CUSTOMERS_SEGMENTS.business
    })
    segment: CUSTOMERS_SEGMENTS

    @Column('varchar',{ length: 100, nullable: true, default:'primary'})
    type: string

    @Column('varchar',{ length: 30, nullable: true})
    color_code: string

    @Column('text', { nullable: true })
    description: string

    /* Many customers can belong to one COMPANY through the customer segement  */
    @ManyToOne(type => EducationStagesEntity, education_stage => education_stage.customers)
    education_stage: EducationStagesEntity

    @ManyToOne(type => CompanyEntity, customer => customer.customers)
    company: CompanyEntity

    /* Many customers can belong to one education_stages */
    @ManyToOne( type => IncomeBracketEntity, income_bracket => income_bracket.customers )
    income_bracket: IncomeBracketEntity

    /* Many customers can belong to one income_bracket */
    @ManyToOne( type => CompanyCustomerSegmentsEntity, company_customer_segment => company_customer_segment.customers )
    company_customer_segment: CompanyCustomerSegmentsEntity

    /* One customer can have many Problems entries */
    @OneToMany( type => CustomerProblemsEntity, customer_problem => customer_problem.customer )
    customer_problems: CustomerProblemsEntity[]

    /* ONE customer can have MANY segmenations */
    @OneToMany( type => CustomerSegmentationsEntity, customer_segmentation => customer_segmentation.customer )
    customer_segmentations: CustomerSegmentationsEntity[]

    /* One customer can elong to many market_potentials_customer entities */
    @OneToMany( type => MarketPotentialsCustomerEntity, market_potentials_customer => market_potentials_customer.customers )
    market_potentials_customers: MarketPotentialsCustomerEntity[]
}