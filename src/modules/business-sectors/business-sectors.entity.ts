import { Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,OneToMany } from 'typeorm'
import { IsOptional, IsNotEmpty } from 'class-validator';

import { CompanyBusinessSectorsEntity } from '../companies-business-sectors/company-business-sectors.entity'
import { AbstractEntity } from '../../common/abstract.entity'

@Entity('business_sectors')
export class BusinessSectorsEntity extends AbstractEntity {

    @IsNotEmpty()
    @Column('varchar',{ length: 255, unique: true})
    name: string 
    
    @Column('varchar', { length: 255, nullable: true })
    description: string

    /* One business_sector can be in many company_business_sectors */
    @OneToMany( type => CompanyBusinessSectorsEntity, system_data => system_data.business_sector )
    system_data: CompanyBusinessSectorsEntity[]
}
