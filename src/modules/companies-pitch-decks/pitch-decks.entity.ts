import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'
import { CompaniesPitchDecksFilesEntity } from '../companies-pitch-decks-files/companies-pitch-decks-files.entity'

@Entity('pitch_decks')
export class PitchDecksEntity extends AbstractEntity {

    @Column('varchar', { length: 255, nullable: true })
    title: string

    @Column('varchar', { length: 100, nullable: true })
    type: string

    @Column('text', { nullable: true })
    notes: string    

    @Column('text', { nullable: true })
    link: string

    @Column('varchar', { length: 300, nullable: true })
    pitch_decks_image: string

    /* Many connection groups can belong to one company */
    @ManyToOne(type => CompanyEntity, company => company.pick_decks )
    company: CompanyEntity

    /* One Pitch Deck can have many files */
    @OneToMany( type => CompaniesPitchDecksFilesEntity, pitch_deck_file => pitch_deck_file.pitch_deck )
    pitch_deck_files: CompaniesPitchDecksFilesEntity[]
}
