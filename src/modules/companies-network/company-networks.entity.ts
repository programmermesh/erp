import { Entity, Column, ManyToOne, Index } from 'typeorm'

import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'
import { COMPANY_NETWORK_INVITES_STATUS } from '../../common/enum_values'

@Entity('company_network_connections')
export class CompanyNetworksEntity extends AbstractEntity {
    
    @Column('varchar', { length: 500 })
    reason: string

    @Column('text')
    message: string

    @Index()
    @Column({
      type: 'enum',
      enum: COMPANY_NETWORK_INVITES_STATUS,
      default: COMPANY_NETWORK_INVITES_STATUS.pending
    })
    invitation_status: COMPANY_NETWORK_INVITES_STATUS

    /* Many network_connections can belong to one company */
    @ManyToOne( type => CompanyEntity, company => company.company_networks)
    company: CompanyEntity

    /* Many connected_company_id can refer to one company id */
    @ManyToOne( type => CompanyEntity, company => company.company_to_company_network)
    invited_company: CompanyEntity

    /*PENDING CONNECTION TO THE INVESTORS table*/
}