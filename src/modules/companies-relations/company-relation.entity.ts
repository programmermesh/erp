import { Entity, ManyToOne } from 'typeorm'
import { AbstractEntity} from '../../common/abstract.entity'
import { RelationEntity } from '../relations/relation.entity'
import { CompanyEntity } from '../companies/company.entity'

@Entity('company_relations')
export class CompanyRelationEntity extends AbstractEntity {

    /*Many company relations can belong to one relation*/
    @ManyToOne( type => RelationEntity, relation => relation.company_relations )
    relations: RelationEntity

    /* Many company_relations can belong to one company */
    @ManyToOne( type => CompanyEntity, company => company.company_relations )
    companies: CompanyEntity
}
