import {  Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'

import { CompanyEntity } from '../companies/company.entity'
import { RolesEntity } from '../companies-user-roles/roles.entity'
import { AccessTypesEntity } from '../access-types/access-types.entity'
import { UserEntity } from '../users/user.entity'
import { RiskAnalysisUserEntity } from '../companies-risk-analysis-users/risk-analysis-user.entity'


@Entity('company_team_members')
export class CompanyTeamMembersEntity extends AbstractEntity {
    
    @Column('varchar',{ length: 255})
    invite_email: string
    
    @Column('boolean', { default: false })
    invite_accepted: boolean

    @Column('boolean', { default: false })
    archived: boolean

    /* Many companies can have One user as a team member */
    @ManyToOne(type => UserEntity, user => user.team_members)
    user: UserEntity

    /* Many team members can belong to one role*/
    @ManyToOne( type => RolesEntity, role => role.team_members , { onDelete: 'CASCADE' })
    role: RolesEntity
        
    /* Many team members can belong to one company */
    @ManyToOne(type => CompanyEntity , company => company.team_members )
    company: CompanyEntity

    /* Many team members can be assigned to one role */
    @ManyToOne( type => AccessTypesEntity, access_type => access_type.team_members, { onDelete: 'CASCADE' } )
    access_type: AccessTypesEntity

    /* One team member can assigned many risks analysis */
    @OneToMany( type=> RiskAnalysisUserEntity, risk_analysis_user => risk_analysis_user.company_team_members )
    risk_analysis_users: RiskAnalysisUserEntity[]
}
