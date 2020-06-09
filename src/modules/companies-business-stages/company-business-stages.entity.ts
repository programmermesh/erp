import { Entity,ManyToOne } from 'typeorm'

import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'
import { BusinessStagesEntity } from '../business-stages/business-stages.entity'

@Entity('company_business_stages')
export class CompanyBusinessStagesEntity extends AbstractEntity {
    /* Many companies_business_sector can belong to one business_sector*/
    @ManyToOne( type => BusinessStagesEntity, business_stage => business_stage.companies )
    business_stage: BusinessStagesEntity
        
    /* Many customer_segments can belong to one company */
    @ManyToOne(type => CompanyEntity , company => company.business_stages )
    company: CompanyEntity

}
