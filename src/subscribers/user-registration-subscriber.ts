import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm'
import { UserEntity } from '../modules/users/user.entity'
import * as bcrypt from 'bcrypt'

@EventSubscriber()
export class UserPostSubscriber implements EntitySubscriberInterface<UserEntity>{
    listenTo(){
        return UserEntity
    }

    async beforeInsert(event: InsertEvent<UserEntity>){
        event.entity.password = await bcrypt.hash( event.entity.password, 10 )
    }

    async beforeUpdate(event: UpdateEvent<UserEntity> ){
        event.entity.password = await bcrypt.hash( event.entity.password, 10 )
    }

}
