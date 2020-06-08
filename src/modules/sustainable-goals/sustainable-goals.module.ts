import { Module } from '@nestjs/common';
import { SustainableGoalsController } from './sustainable-goals.controller';
import { SustainableGoalsService } from './sustainable-goals.service';
import { SustainableGoalEntity } from './sustainable-goal.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SustainableGoalEntity])],
  controllers: [SustainableGoalsController],
  providers: [SustainableGoalsService]
})
export class SustainableGoalsModule {}
