import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CompanyEntity } from '../companies/company.entity'
import { MONTHS_OF_THE_YEAR } from '../../common/enum_values'

@Entity('company_milestones')
export class CompanyMilestonesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the title of the milestone'})
    @Column('varchar', { length: 255, nullable: true })
    title: string

    @ApiProperty({ description: 'This is the description of the milestone'})
    @Column('text', { nullable: true })
    description: string

    /* PENDING ENUM THE MONTHS */
    @ApiProperty({ description: 'This is the month', enum: MONTHS_OF_THE_YEAR})
    @Column({
      type: 'enum',
      enum: MONTHS_OF_THE_YEAR,
      default: MONTHS_OF_THE_YEAR.January
    })
    month: MONTHS_OF_THE_YEAR

    /* PENDING GET THE YEAR*/
    @ApiProperty({ description: 'This is the year'})
    @Column('integer', { default: 2000})
    year: number

    @ApiProperty({ description: 'This is the status of the milestone. True if archived and False if not archived'})
    @Column('boolean', { default: false})
    milestone_archived: boolean

    /* Many connection groups can belong to one company */
    @ApiProperty({ description: 'This is the id of the company the milestone is associated to' })
    @ManyToOne(type => CompanyEntity, company => company.connection_groups )
    company: CompanyEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}