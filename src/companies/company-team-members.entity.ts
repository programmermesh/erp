import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { CompanyEntity } from './company.entity'
import { RolesEntity } from '../roles/roles.entity'
import { AccessTypesEntity } from '../access-types/access-types.entity'
import { UserEntity } from '../users/user.entity'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('company_team_members')
export class CompanyTeamMembersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the email used to invite the user '})
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 255})
    invite_email: string
    
    @ApiProperty({ description: 'This is a BOOLEAN value with TRUE = invite accepted and FALSE for pending invites' })
    @Column('boolean', { default: false })
    @ApiPropertyOptional()
    invite_accepted: boolean

    /* Many companies can have One user as a team member */
    @ApiProperty({ description: 'This is the id of the team member in the USERS table' })
    @ManyToOne(type => UserEntity, user => user.team_members)
    user: UserEntity

    /* Many team members can belong to one role*/
    @ApiProperty({ description: 'This will be the ID of the role the member is assigned to' })
    @ManyToOne( type => RolesEntity, role => role.team_members )
    role: RolesEntity
        
    /* Many team members can belong to one company */
    @ApiProperty({ description: 'This will be the ID of the company the member belongs to' })
    @ManyToOne(type => CompanyEntity , company => company.team_members )
    company: CompanyEntity

    /* Many team members can be assigned to one role */
    @ManyToOne( type => AccessTypesEntity, access_type => access_type.team_members )
    access_type: AccessTypesEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date

}