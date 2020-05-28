import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { CompanyEntity } from '../companies/company.entity'
import { COST_OR_REVENUE } from '../../common/enum_values'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('costs_and_revenues')
export class CostAndRevenuesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the title/value of the company value '})
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 255})
    title: string

    @ApiProperty({ description: 'The summary description'})
    @Column('text')
    description: string

    @ApiProperty({ description: 'This is the estimated value ot the cost or revenue'})
    @Column('integer', { nullable: true} )
    estimated_cost: number

    /* PENDING enum field type */
    @ApiProperty({  description: 'This an enum to specify if its cost or revenue', enum: ['cost', 'revenue'] })
    @Column({
      type: 'enum',
      enum: COST_OR_REVENUE,
      default: COST_OR_REVENUE.cost
    })
    type: COST_OR_REVENUE

    /* Many values belong to one company*/
    @ApiProperty({ description: 'This is the ID of the company the costs_and_revenue belongs to' })
    @ManyToOne(type => CompanyEntity, company => company.costs_and_revenues)
    company: CompanyEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}