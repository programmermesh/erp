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

@Entity('pitch_decks')
export class PitchDecksEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the title of the pick deck'})
    @Column('varchar', { length: 255, nullable: true })
    title: string

    @ApiProperty({ description: 'This is the type of the pick deck'})
    @Column('varchar', { length: 100, nullable: true })
    type: string

    @ApiProperty({ description: 'This is the notes of the pick deck'})
    @Column('text', { nullable: true })
    notes: string    

    @ApiProperty({ description: 'This is the link of the pick deck'})
    @Column('varchar', { length: 300, nullable: true })
    link: string

    @ApiProperty({ description: 'This is the url for cover_image of the pick deck'})
    @Column('varchar', { length: 300, nullable: true })
    cover_image: string

    /* Many connection groups can belong to one company */
    @ApiProperty({ description: 'This is the id of the company the pick_decks is associated to' })
    @ManyToOne(type => CompanyEntity, company => company.pick_decks )
    company: CompanyEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}