import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { CompanyEntity } from '../companies/company.entity'

@Entity('competitors')
export class CompetitorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is name of the competitor'})
    @Column('varchar', { length: 255 })
    name: string

    @ApiProperty({ description: 'This is the type of competitor'})
    @Column('varchar', { length: 255 })
    type: string

    @ApiProperty({ description: 'This is the point of differentiation'})
    @Column('varchar', { length: 255 })
    point_of_differentiation: string

    @ApiProperty({ description: 'This is the details about the competitor '})
    @Column('text')
    details: string

    @ApiProperty({ description: 'This is the importance level of the competitor'})
    @Column('varchar', { length: 255 })
    importance_level: string

    @ApiProperty({ description: 'This is the link or website url'})
    @Column('varchar', { length: 255, nullable: true })
    website: string

    /* Many competitors can be link to one company */
    @ApiProperty({ description: 'This is the ID of the company the competitor belongs to' })
    @ManyToOne( type => CompanyEntity, company => company.competitors )
    company: CompanyEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}