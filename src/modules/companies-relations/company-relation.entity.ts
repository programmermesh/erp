import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { RelationEntity } from '../relations/relation.entity'
import { CompanyEntity } from '../companies/company.entity'

@Entity('company_relations')
export class CompanyRelationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string  

    /*Many company relations can belong to one relation*/
    @ApiProperty({ description: 'This is the ID of the relation the company_relation belongs to' })
    @ManyToOne( type => RelationEntity, relation => relation.company_relations )
    relations: RelationEntity

    /* Many company_relations can belong to one company */
    @ApiProperty({ description: 'This is the ID of the company that the company _relation belongs to' })
    @ManyToOne( type => CompanyEntity, company => company.company_relations )
    companies: CompanyEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}