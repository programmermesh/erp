import { Module } from '@nestjs/common';
import { CompaniesPitchDecksController } from './companies-pitch-decks.controller';

@Module({
  controllers: [CompaniesPitchDecksController]
})
export class CompaniesPitchDecksModule {}
