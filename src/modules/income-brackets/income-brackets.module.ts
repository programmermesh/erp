import { Module } from '@nestjs/common';
import { IncomeBracketsController } from './income-brackets.controller';
import { IncomeBracketsService } from './income-brackets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomeBracketEntity } from './income-bracket.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ IncomeBracketEntity ])],
  controllers: [IncomeBracketsController],
  providers: [IncomeBracketsService]
})
export class IncomeBracketsModule {}
