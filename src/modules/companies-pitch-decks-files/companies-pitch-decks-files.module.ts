import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesPitchDecksFilesController } from './companies-pitch-decks-files.controller';
import { CompaniesPitchDecksFilesService } from './companies-pitch-decks-files.service';
import { CompaniesPitchDecksFilesEntity as PitchDeckFile } from './companies-pitch-decks-files.entity'
import { PitchDecksEntity as PitchDeck } from '../companies-pitch-decks/pitch-decks.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PitchDeckFile, PitchDeck
    ])
  ],
  controllers: [CompaniesPitchDecksFilesController],
  providers: [CompaniesPitchDecksFilesService]
})
export class CompaniesPitchDecksFilesModule {}
