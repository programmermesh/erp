import { Module } from '@nestjs/common';
import { IncomeBracketsController } from './income-brackets.controller';
import { IncomeBracketsService } from './income-brackets.service';

@Module({
  controllers: [IncomeBracketsController],
  providers: [IncomeBracketsService]
})
export class IncomeBracketsModule {}
