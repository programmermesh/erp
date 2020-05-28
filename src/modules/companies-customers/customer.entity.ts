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
import { EducationStagesEntity } from '../../education-stages/education-stages.entity'
import { IncomeBracketEntity } from '../../income-brackets/income-bracket.entity'
import { CompanyCustomerSegmentsEntity } from '../companies-customer-segments/company-customer-segments.entity'
import { CustomerProblemsEntity } from '../../customers/customer-problems.entity'
import { MarketPotentialsCustomerEntity } from '../../market-potentials/market-potentials-customer.entity'
import { GENDER, RELATIONSHIP_STATUS } from '../../common/enum_values'

@Entity('customers')
export class CustomerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the title of the customer '})
    @Column('varchar',{ length: 255})
    title: string

    @ApiProperty({ description: 'This is the minimum age'})
    @Column('int')
    minimum_age: number

    @ApiProperty({ description: 'This is the maximum age'})
    @Column('int')
    maximum_age: number
    
    @ApiProperty({ description: 'This is the gender of the customer', enum: GENDER})
    @Column({
      type: 'enum',
      enum: GENDER,
      default: GENDER.male
    })
    sex: GENDER

    @ApiProperty({ description: 'This is the relationship status of the customer', enum: RELATIONSHIP_STATUS})
    @Column({
      type: 'enum',
      enum: RELATIONSHIP_STATUS,
      default: RELATIONSHIP_STATUS.single
    })
    relationship_status: RELATIONSHIP_STATUS

    @ApiProperty({ description: 'This is the occupation of the customer'})
    @Column('varchar',{ length: 100, nullable: true})
    occupation: string

    @ApiProperty({ description: 'This is the color code of the customer'})
    @Column('varchar',{ length: 30, nullable: true})
    color_code: string

    @ApiProperty({ description: 'This is the general description of the customer'})
    @Column('text', { nullable: true })
    general_description: string

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date

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