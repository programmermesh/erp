import { Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,OneToMany} from 'typeorm'
import { IsOptional, IsNotEmpty } from 'class-validator';

import { CompanySustainableGoalsEntity } from '../companies-sustainable-goals/company-sustainable-goals.entity'
import { AbstractEntity } from '../../common/abstract.entity'

@Entity('sustainable_goals')
export class SustainableGoalEntity extends AbstractEntity {
    
    @IsNotEmpty()
    @Column('varchar',{ length: 255, unique: true})
    name: string

    @Column('varchar', { length: 300, nullable: true })
    @IsOptional()
    sustainable_goal_image: string
    
    /* One sustainable goal can be assigned to many companies */
    @OneToMany( type => CompanySustainableGoalsEntity, sustainable_goal => sustainable_goal.company )
    companies: CompanySustainableGoalsEntity[]
}