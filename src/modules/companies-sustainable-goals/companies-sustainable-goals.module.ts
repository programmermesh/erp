import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompaniesSustainableGoalsController } from './companies-sustainable-goals.controller';
import { CompanyEntity } from '../companies/company.entity';
import { UserEntity } from '../users/user.entity'
import { CompanySustainableGoalsEntity } from './company-sustainable-goals.entity'
import { CompaniesSustainableGoalsService } from './companies-sustainable-goals.service';
import { SustainableGoalEntity } from '../sustainable-goals/sustainable-goal.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    CompanyEntity,
    UserEntity,
    CompanySustainableGoalsEntity,
    SustainableGoalEntity
  ])],
  controllers: [CompaniesSustainableGoalsController],
  providers: [CompaniesSustainableGoalsService]
})
export class CompaniesSustainableGoalsModule {}
