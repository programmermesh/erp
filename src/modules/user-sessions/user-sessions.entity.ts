import { Entity, Column, ManyToOne} from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { UserEntity } from '../users/user.entity'

@Entity('user_sessions')
export class UserSessionsEntity extends AbstractEntity {

    @Column('boolean', { default: false })
    in_use: boolean // WE WILL USE THIS TO DETERMINE IF THE SESSION IS IN CURRENT USE

    @Column('boolean', { default: false })
    active: boolean

    @Column('int', { default: 0 })
    active_time: number

    @Column({ type: 'text', nullable: true })
    token: string

    /* Many User sessions can belong to one one */
    @ManyToOne(type => UserEntity, user => user.sessions )
    user: UserEntity

}

