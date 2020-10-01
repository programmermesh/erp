import { Entity, Column,  OneToMany } from 'typeorm'
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CompanyBusinessStagesEntity } from '../companies-business-stages/company-business-stages.entity'
import { AbstractEntity } from '../../common/abstract.entity'

@Entity('business_stages')
export class BusinessStagesEntity extends AbstractEntity {
  
  @Column('varchar',{ length: 255, unique: true})
  name: string
    
  @Column('varchar', { length: 255, nullable: true })
  description: string

    /* One business_stage can have many company_business_stages assigned to it */
  @OneToMany( type => CompanyBusinessStagesEntity, system_data => system_data.business_stage )
  system_data: CompanyBusinessStagesEntity[]
}

/**
 * Idea stage
 * MVP stage (Minimum variable product)
 * Testing Stage
 * Validation stage
 * Operational stage
 * Scaling stage
 */
