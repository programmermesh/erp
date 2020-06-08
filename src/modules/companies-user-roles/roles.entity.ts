import { Entity,Column, ManyToOne,OneToMany} from 'typeorm'
import { IsNotEmpty, IsString } from 'class-validator';

import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'
import { CompanyTeamMembersEntity } from '../companies-team-members/company-team-members.entity'

@Entity('roles')
export class RolesEntity extends AbstractEntity {

    @IsNotEmpty()
    @IsString()
    @Column('varchar',{ length: 255})
    name: string

    /* Many roles can belong to ony one company */
    @ManyToOne(type => CompanyEntity, company => company.roles)
    company: CompanyEntity

    /* One role can have many team members assigned to it*/
    @OneToMany( type => CompanyTeamMembersEntity, member_role => member_role.role )
    team_members: CompanyTeamMembersEntity
}
