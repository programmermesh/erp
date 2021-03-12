import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { CompanyTeamMembersEntity } from '../companies-team-members/company-team-members.entity';
import { ResetPasswordRequestEntity } from '../auth/reset-password.entity';
import { UserSessionsEntity } from '../user-sessions/user-sessions.entity';
import { CompanyEntity } from '../companies/company.entity';
import { Exclude } from 'class-transformer';
import { UserEntity } from '../users/user.entity';

@Entity('task_manager')
export class TaskManagerEntity extends AbstractEntity {
  @Column('varchar', { length: 255, unique: true })
  company_id: string;

  @Column('varchar', { length: 255, nullable: true })
  task_name: string;

  @Column('varchar', { length: 255, nullable: true })
  assign_to: string;

  @Column('varchar', { length: 255, nullable: true })
  owner: string;

  @Column({ type: 'boolean', default: false })
  is_completed?: boolean;

  // /* Many tasks can be assigned to one user */
  // @ManyToOne(
  //   type => UserEntity,
  //   user => user.team_members,
  // )
  // task: UserEntity;

  // /* Many tasks can be assigned to one company */
  // @ManyToOne(
  //   type => CompanyEntity,
  //   company => company.company_name,
  // )
  // task_company: CompanyEntity;
}
