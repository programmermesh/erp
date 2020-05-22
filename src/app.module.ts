import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CustomerSegmentsModule } from './customer-segments/customer-segments.module';
import { CompaniesCustomerSegmentsModule } from './companies-customer-segments/companies-customer-segments.module';
import { BusinessSectorsModule } from './business-sectors/business-sectors.module';
import { CompaniesBusinessSectorsModule } from './companies-business-sectors/companies-business-sectors.module';
import { BusinessStagesModule } from './business-stages/business-stages.module';
import { CompaniesBusinessStagesModule } from './companies-business-stages/companies-business-stages.module';
import { CompaniesTeamMembersModule } from './companies-team-members/companies-team-members.module';
import { CompaniesUserRolesModule } from './companies-user-roles/companies-user-roles.module';
import { AccessTypesModule } from './access-types/access-types.module';
import { SustainableGoalsModule } from './sustainable-goals/sustainable-goals.module';
import { CompaniesSustainableGoalsModule } from './companies-sustainable-goals/companies-sustainable-goals.module';
import { CompaniesPhotosModule } from './companies-photos/companies-photos.module';
import { CompaniesConnectionsModule } from './companies-connections/companies-connections.module';
import { CompaniesMilestonesModule } from './companies-milestones/companies-milestones.module';

@Module({
  imports: [ TypeOrmModule.forRoot(), CompaniesModule, UsersModule, AuthModule, CustomerSegmentsModule, CompaniesCustomerSegmentsModule, BusinessSectorsModule, CompaniesBusinessSectorsModule, BusinessStagesModule, CompaniesBusinessStagesModule, CompaniesTeamMembersModule, CompaniesUserRolesModule, AccessTypesModule, SustainableGoalsModule, CompaniesSustainableGoalsModule, CompaniesPhotosModule, CompaniesConnectionsModule, CompaniesMilestonesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
