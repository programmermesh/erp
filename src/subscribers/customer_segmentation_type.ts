import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm'
import { CustomerSegmentationTypeEntity } from '../modules/customer-segmentation-type/customer-segmentation-type.entity'

@EventSubscriber()
export class CustomerSegmentationTypeSubscriber implements EntitySubscriberInterface<CustomerSegmentationTypeEntity>{
    listenTo(){
        return CustomerSegmentationTypeEntity
    }

    async beforeInsert(event: InsertEvent<CustomerSegmentationTypeEntity>){
        event.entity.title =  event.entity.title.toUpperCase()
    }

    async beforeUpdate(event: UpdateEvent<CustomerSegmentationTypeEntity> ){
        event.entity.title =  event.entity.title.toUpperCase()
    }

}