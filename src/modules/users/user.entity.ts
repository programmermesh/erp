import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyTeamMembersEntity } from '../companies-team-members/company-team-members.entity';
import { ResetPasswordRequestEntity } from '../auth/reset-password.entity';
import { UserSessionsEntity } from '../user-sessions/user-sessions.entity';
import { CompanyEntity } from '../companies/company.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { length: 255, nullable: true })
  firstname_lastname?: string;

  @Exclude()
  @Column({ select: false, type: 'varchar', length: 255 })
  password: string;

  @Column('varchar', { length: 255, nullable: true })
  profile_photo: string;

  @Column('varchar', { length: 255, nullable: true })
  company_name: string;

  @Column('varchar', { length: 255, nullable: true })
  department: string;

  @Column('varchar', { length: 255, nullable: true })
  role: string;

  @Column('varchar', { length: 255, nullable: true })
  team_size: string;

  @Column('varchar', { length: 255, nullable: true })
  business_stage: string;

  @Column('varchar', { length: 255, nullable: true })
  business_objectives: string;

  @Column('varchar', { length: 255, nullable: true })
  investors_time_reference: string;

  @Column('varchar', { length: 255, nullable: true })
  active_token: string;

  @Column({ type: 'boolean', default: false })
  is_verified?: boolean;

  @OneToOne(() => CompanyEntity, (company) => company.last_accessed_by_user)
  @JoinColumn()
  last_accessed_company: CompanyEntity;

  @Column({ type: 'boolean', default: false })
  is_active?: boolean;

  /* A USER can be a part of MANY company team members group */
  @OneToMany(
    (type) => CompanyTeamMembersEntity,
    (team_member) => team_member.user,
  )
  team_members: CompanyTeamMembersEntity[];

  /*One user can have many companies*/
  @OneToMany((type) => CompanyEntity, (company) => company.created_by)
  owner: CompanyEntity[];

  /*ONE USER CAN HAVE MANY USER SESSIONS*/
  @OneToMany((type) => UserSessionsEntity, (user_session) => user_session.user)
  sessions: UserSessionsEntity[];

  /* One user can have many password requests but one active one*/
  @OneToMany(
    (type) => ResetPasswordRequestEntity,
    (reset_password_request) => reset_password_request.isActive,
  )
  reset_password_requests: ResetPasswordRequestEntity[];
}
