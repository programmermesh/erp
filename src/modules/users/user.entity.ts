import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyTeamMembersEntity } from '../companies-team-members/company-team-members.entity';
import { ResetPasswordRequestEntity } from '../auth/reset-password.entity';
import { UserSessionsEntity } from '../user-sessions/user-sessions.entity';
import { CompanyEntity } from '../companies/company.entity';
import { Exclude } from 'class-transformer';
import { TaskManagerEntity } from '../task-manager/task-manager.entity';

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
  active_token: string;

  @Column({ type: 'boolean', default: false })
  is_verified?: boolean;

  @Column({ type: 'boolean', default: false })
  is_invited?: boolean;

  @OneToOne(
    () => CompanyEntity,
    company => company.last_accessed_by_user,
  )
  @JoinColumn()
  last_accessed_company: CompanyEntity;

  @Column({ type: 'boolean', default: false })
  is_active?: boolean;

  /* A USER can be a part of MANY company team members group */
  @OneToMany(
    type => CompanyTeamMembersEntity,
    team_member => team_member.user,
  )
  team_members: CompanyTeamMembersEntity[];

  /*One user can have many companies*/
  @OneToMany(
    type => CompanyEntity,
    company => company.created_by,
  )
  owner: CompanyEntity[];

  // /*One user can have many task*/
  // @OneToMany(
  //   type => TaskManagerEntity,
  //   task_manager => task_manager.task,
  // )
  // task_managers: TaskManagerEntity[];

  /*ONE USER CAN HAVE MANY USER SESSIONS*/
  @OneToMany(
    type => UserSessionsEntity,
    user_session => user_session.user,
  )
  sessions: UserSessionsEntity[];

  /* One user can have many password requests but one active one*/
  @OneToMany(
    type => ResetPasswordRequestEntity,
    reset_password_request => reset_password_request.isActive,
  )
  reset_password_requests: ResetPasswordRequestEntity[];
}
