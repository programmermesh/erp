import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm'
import { UserEntity } from '../modules/users/user.entity'
import * as bcrypt from 'bcrypt'

@EventSubscriber()
export class UserPostSubscriber implements EntitySubscriberInterface<UserEntity>{
    listenTo(){
        return UserEntity
    }

    async beforeInsert(event: InsertEvent<UserEntity>){
        // if we have a password in the inser event then we convert it to a hashed password
        if(event.entity.password){
          event.entity.password = await bcrypt.hash( event.entity.password, 10 )  
        }
        
    }

    async beforeUpdate(event: UpdateEvent<UserEntity> ){
        if(event.entity.password){
           event.entity.password = await bcrypt.hash( event.entity.password, 10 ) 
        }
            
    }

}
