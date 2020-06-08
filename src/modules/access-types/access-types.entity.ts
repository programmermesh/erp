import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { IsNotEmpty } from 'class-validator';

import { CompanyTeamMembersEntity } from '../companies-team-members/company-team-members.entity'
import { AbstractEntity } from '../../common/abstract.entity'

@Entity('access_types')
export class AccessTypesEntity extends AbstractEntity {
   
    @IsNotEmpty()
    @Column('varchar',{ length: 255, unique: true})
    name: string

    /* One access_type can be assgned to many team members */
    @OneToMany(type => CompanyTeamMembersEntity, team_member => team_member.access_type )
    team_members: CompanyTeamMembersEntity[]
}
