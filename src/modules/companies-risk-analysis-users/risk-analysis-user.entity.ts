import { Entity, ManyToOne } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { RiskAnalysisEntity } from '../companies-risks/risk-analysis/risk-analysis.entity'
import { CompanyTeamMembersEntity } from '../companies-team-members/company-team-members.entity'

@Entity('risk_analysis_users')
export class RiskAnalysisUserEntity extends AbstractEntity {
    /* Many risks_analysis can belong to one company */
    @ManyToOne( type => RiskAnalysisEntity, risk_analysis => risk_analysis.risk_analysis_users, {onDelete:'CASCADE'} )
    risk_analysis: RiskAnalysisEntity

    /* Many risk_analysis_users entities can belong to one company team member */
    @ManyToOne( Type => CompanyTeamMembersEntity, company_team_member => company_team_member.risk_analysis_users )
    company_team_members: CompanyTeamMembersEntity
}
