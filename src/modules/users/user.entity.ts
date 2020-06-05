import { Entity,Column,OneToMany} from 'typeorm'
 import { AbstractEntity } from '../../common/abstract.entity'
import { CrudValidationGroups } from '@nestjsx/crud';
import { CompanyTeamMembersEntity } from '../companies-team-members/company-team-members.entity'
import { ResetPasswordRequestEntity } from '../auth/reset-password.entity'
import { CompanyEntity } from '../companies/company.entity' 
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity extends AbstractEntity {

    @Column('varchar',{ length: 255, unique: true })
    email: string
    
    @Column('varchar', { length: 255 ,nullable: true})
    firstname_lastname?: string

    @Column('varchar', { length: 255 ,nullable: true})
    surname: string

    @Exclude()
    @Column('varchar', { length: 255})
    password: string

    @Column('varchar', { length: 255 ,nullable: true})
    profile_photo: string

    @Column('varchar', { length: 255 ,nullable: true})
    country?: string

    @Column('varchar', { length: 255 ,nullable: true})
    city?: string

    @Column('varchar', { length: 255 ,nullable: true})
    facebook: string

    @Column('varchar', { length: 255 ,nullable: true})
    linkedin: string

    @Column('varchar', { length: 255 ,nullable: true})
    twitter: string

    @Column('varchar', { length: 255 ,nullable: true})
    youtube: string

    @Column('text', { nullable: true})
    others: string

    @Column({ type: 'boolean', default: true })
    is_active?: boolean     

    /* A USER can be a part of MANY company team members group */
    @OneToMany( type => CompanyTeamMembersEntity, team_member => team_member.user )
    team_members: CompanyTeamMembersEntity[]

    /*One user can have many companies*/
    @OneToMany( type => CompanyEntity, company => company.created_by )
    owner: CompanyEntity[]

    /* One user can have many password requests but one active one*/
    @OneToMany( type => ResetPasswordRequestEntity, reset_password_request => reset_password_request.isActive )
    reset_password_requests: ResetPasswordRequestEntity[]


}
