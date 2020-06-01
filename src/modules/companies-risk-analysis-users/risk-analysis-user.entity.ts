import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { RiskAnalysisEntity } from '../companies-risks/risk-analysis/risk-analysis.entity'
import { CompanyTeamMembersEntity } from '../companies-team-members/company-team-members.entity'

@Entity('risk_analysis_users')
export class RiskAnalysisUserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string  

    /* Many risks_analysis can belong to one company */
    @ApiProperty({ description: 'This is the ID of the risk_analysis entity a user will be attached to' })
    @ManyToOne( type => RiskAnalysisEntity, risk_analysis => risk_analysis.risk_analysis_users )
    risk_analysis: RiskAnalysisEntity

    /* Many risk_analysis_users entities can belong to one company team member */
    @ApiProperty({ description: 'This is the ID of the risk_analysis entity a user will be attached to' })
    @ManyToOne( Type => CompanyTeamMembersEntity, company_team_member => company_team_member.risk_analysis_users )
    company_team_members: CompanyTeamMembersEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}