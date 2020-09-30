import { Entity, Column,ManyToOne } from 'typeorm'

import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'
import { RESOURCES_ACTIVITIES_RESOURCES_TYPE } from '../../common/enum_values'

@Entity('companies_resources-activities_partners')
export class ResourcesActivitiesPartnersEntity extends AbstractEntity {

    @Column('varchar',{ length: 255})
    title: string

    @Column('text')
    description: string

    @Column('varchar', { default: null, length: 200 })
    category: string

    @Column({
      type: 'enum',
      enum: RESOURCES_ACTIVITIES_RESOURCES_TYPE,
      default: RESOURCES_ACTIVITIES_RESOURCES_TYPE.resource
    })
    type: RESOURCES_ACTIVITIES_RESOURCES_TYPE

    /* Many values belong to one company*/
    @ManyToOne(type => CompanyEntity, company => company.resources_activities_partners)
    company: CompanyEntity
}

