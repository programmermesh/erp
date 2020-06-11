import { Module } from '@nestjs/common';
import { CompaniesPitchDecksController } from './companies-pitch-decks.controller';
import { CompaniesPitchDecksService } from './companies-pitch-decks.service';
import { CompanyEntity } from '../companies/company.entity'
import { PitchDecksEntity } from './pitch-decks.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([
    CompanyEntity,
    PitchDecksEntity
  ])],
  controllers: [CompaniesPitchDecksController],
  providers: [CompaniesPitchDecksService]
})
export class CompaniesPitchDecksModule {}
