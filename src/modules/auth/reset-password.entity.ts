import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm'
import { UserEntity } from '../users/user.entity'
import { AbstractEntity } from '../../common/abstract.entity'

@Entity('users_reset_password_requests')
export class ResetPasswordRequestEntity extends AbstractEntity  {
    
    @Column('boolean', { default:true })
    isActive: boolean

    @ManyToOne( type => UserEntity, user => user.reset_password_requests )
    users: UserEntity
}
