import { Entity, Column, ManyToOne } from 'typeorm'

import { CompanyEntity } from '../companies/company.entity'
import { SustainableGoalEntity } from '../sustainable-goals/sustainable-goal.entity'
import { AbstractEntity } from '../../common/abstract.entity'

@Entity('company_sustainable_goals')
export class CompanySustainableGoalsEntity extends AbstractEntity {

    @Column('text', { nullable: true})
    objective: string
    
    @Column('text', { nullable: true})
    description: string

    @Column('boolean', { default: false })
    active: boolean
    
    /* Many companies_sustainable_goals can belong to one sustainable_goal*/
    @ManyToOne( type => SustainableGoalEntity, sustainable_goal => sustainable_goal.companies )
    sustainable_goal: SustainableGoalEntity
        
    /* Many sustainable_goals can belong to one company */
    @ManyToOne(type => CompanyEntity , company => company.sustainable_goals )
    company: CompanyEntity

}