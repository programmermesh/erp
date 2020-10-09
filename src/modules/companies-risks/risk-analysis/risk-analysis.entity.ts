import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../../common/abstract.entity'
import { CompanyEntity } from '../../companies/company.entity'
import { RiskAnalysisUserEntity } from '../../companies-risk-analysis-users/risk-analysis-user.entity'
import { RISK_ANALYSIS_TYPE } from '../../../common/enum_values'

@Entity('risk_analysis')
export class RiskAnalysisEntity extends AbstractEntity{ 

    @Column('varchar', { length: 255 })
    title: string

    @Column({
        type: 'varchar',
        default: '',
        length: 255
    })
    type: string

    @Column('varchar', { length: 255, nullable: true })
    consequences: string

    @Column('varchar', { length: 255, nullable: true })
    likelihood: string

    @Column('text', { nullable: true })
    description: string

    /* Many risks_analysis can belong to one company */
    @ManyToOne( type => CompanyEntity, company => company.risks_analysis )
    company: CompanyEntity

    /* One risk analysis can be assigned to many risk_analysis_users */
    @OneToMany( type => RiskAnalysisUserEntity, risk_analysis_user => risk_analysis_user.risk_analysis )
    risk_analysis_users: RiskAnalysisUserEntity[]
}