import { Entity,ManyToOne} from 'typeorm'

import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'
import { BusinessSectorsEntity } from '../business-sectors/business-sectors.entity'

@Entity('company_business_sectors')
export class CompanyBusinessSectorsEntity extends AbstractEntity {
    
    /* Many companies_business_sector can belong to one business_sector*/
    @ManyToOne( type => BusinessSectorsEntity, business_sector => business_sector.system_data )
    business_sector: BusinessSectorsEntity
        
    /* Many customer_segments can belong to one company */
    @ManyToOne(type => CompanyEntity , company => company.business_sectors )
    company: CompanyEntity
}
