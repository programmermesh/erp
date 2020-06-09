import { Entity,ManyToOne,OneToMany} from 'typeorm'

import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'
import { CustomerSegmentEntity } from '../customer-segments/customer-segment.entity'
import { CustomerEntity } from '../companies-customers/customer.entity'
import { CompanyCustomerSegmentDetailsEntity } from '../companies-customer-segment-details/company-customer-segment-details.entity'

@Entity('company_customer_segments')
export class CompanyCustomerSegmentsEntity extends AbstractEntity {
    
    /* Many companies_customers_segments can belong to one customer_segment*/
    @ManyToOne( type => CustomerSegmentEntity, customer_segment => customer_segment.company )
    customer_segment: CustomerSegmentEntity
        
    /* Many customer_segments can belong to one company */
    @ManyToOne(type => CompanyEntity , company => company.customer_segments )
    company: CompanyEntity

    /* One csutomer segement can have many customers assigned to it */
    @OneToMany( type => CustomerEntity, customer => customer.company_customer_segment )
    customers: CustomerEntity[]

    /* One company customer segment can have many details  */
    @OneToMany( type => CompanyCustomerSegmentDetailsEntity, company_customer_segment_details => company_customer_segment_details.company_customer_segments )
    company_customer_segment_details: CompanyCustomerSegmentDetailsEntity[]

}
