import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import { CrudValidationGroups } from '@nestjsx/crud';
import { CompanyEntity } from './company.entity'
import { SustainableGoalEntity } from '../sustainable-goals/sustainable-goal.entity'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('company_sustainable_goals')
export class CompanySustainableGoalsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string 

    @ApiProperty({ description: 'This field will have the objective for a given company', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    objective?: string

    @ApiProperty({ description: 'This field will have the description for a given company', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    description?: string
    
    /* Many companies_sustainable_goals can belong to one sustainable_goal*/
    @ApiProperty({ description: 'This will be the ID of the sustainable the field is assigned to' })
    @ManyToOne( type => SustainableGoalEntity, sustainable_goal => sustainable_goal.companies )
    sustainable_goal: SustainableGoalEntity
        
    /* Many sustainable_goals can belong to one company */
    @ApiProperty({ description: 'This will be the ID of the company the sustainable_goals belongs to' })
    @ManyToOne(type => CompanyEntity , company => company.sustainable_goals )
    company: CompanyEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date

}