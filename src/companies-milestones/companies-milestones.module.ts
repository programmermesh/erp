import { Module } from '@nestjs/common';
import { CompaniesMilestonesController } from './companies-milestones.controller';

@Module({
  controllers: [CompaniesMilestonesController]
})
export class CompaniesMilestonesModule {}
