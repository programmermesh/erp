import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { CompanyEntity } from '../companies/company.entity'
import { RiskAnalysisUserEntity } from './risk-analysis-user.entity'

@Entity('risk_analysis')
export class RiskAnalysisEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the title of the risk analysis'})
    @Column('varchar', { length: 255 })
    title: string

    @ApiProperty({ description: 'This is the type of the risk analysis'})
    @Column('varchar', { length: 255, nullable: true})
    type: string

    @ApiProperty({ description: 'This is the consiquences of the risk analysis'})
    @Column('varchar', { length: 255, nullable: true })
    consequences: string

    @ApiProperty({ description: 'This is the likelihood of the risk analysis'})
    @Column('varchar', { length: 255, nullable: true })
    likelihood: string

    @ApiProperty({ description: 'This is the description of the risk analysis'})
    @Column('text', { nullable: true })
    description: string

    /* Many risks_analysis can belong to one company */
    @ApiProperty({ description: 'This is the ID of the company that the analysis belongs to' })
    @ManyToOne( type => CompanyEntity, company => company.risks_analysis )
    company: CompanyEntity

    /* One risk analysis can be assigned to many risk_analysis_users */
    @OneToMany( type => RiskAnalysisUserEntity, risk_analysis_user => risk_analysis_user.risk_analysis )
    risk_analysis_users: RiskAnalysisUserEntity[]

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}