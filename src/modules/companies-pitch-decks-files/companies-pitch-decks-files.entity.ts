import { Entity, Column, ManyToOne } from 'typeorm'

import { PitchDecksEntity } from '../companies-pitch-decks/pitch-decks.entity'
import { AbstractEntity } from '../../common/abstract.entity'
@Entity('pitch_deck_files')
export class CompaniesPitchDecksFilesEntity extends AbstractEntity{

    @Column('varchar', { nullable: true })
    name: string

    @Column('varchar', { length: 500})
    pitch_deck_file_url: string

    /* Many files can belong to one market potential entry */
    @ManyToOne( type => PitchDecksEntity, pitch_deck => pitch_deck.pitch_deck_files, { onDelete: 'CASCADE' } )
    pitch_deck: PitchDecksEntity
}