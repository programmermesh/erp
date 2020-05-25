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
import { RiskAnalysisModule } from './companies-risks/risk-analysis/risk-analysis.module';
import { RiskAssessmentsModule } from './companies-risks/risk-assessments/risk-assessments.module';
import { CompaniesLeadListModule } from './companies-lead-list/companies-lead-list.module';
import { CompaniesPitchDecksModule } from './companies-pitch-decks/companies-pitch-decks.module';
import { CompaniesCostAndRevenuesModule } from './companies-cost-and-revenues/companies-cost-and-revenues.module';
import { CompaniesValuesModule } from './companies-values/companies-values.module';
import { CompaniesCompetitionsModule } from './companies-competitions/companies-competitions.module';
import { CompaniesMarketPotentialsModule } from './companies-market-potentials/companies-market-potentials.module';
import { CompaniesCustomersSegmentationsModule } from './companies-customers-segmentations/companies-customers-segmentations.module';
import { CompaniesRelationsModule } from './companies-relations/companies-relations.module';
import { RelationsModule } from './relations/relations.module';
import { ChannelsModule } from './channels/channels.module';
import { CompaniesConversationsModule } from './companies-conversations/companies-conversations.module';
import { CompaniesConversationsMembersModule } from './companies-conversations-members/companies-conversations-members.module';
import { CompaniesConversationsMessagesModule } from './companies-conversations-messages/companies-conversations-messages.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot(),
    CompaniesModule, UsersModule, AuthModule, CustomerSegmentsModule,
    CompaniesCustomerSegmentsModule, BusinessSectorsModule,
    CompaniesBusinessSectorsModule, BusinessStagesModule,
    CompaniesBusinessStagesModule, CompaniesTeamMembersModule,
    CompaniesUserRolesModule, AccessTypesModule, 
    SustainableGoalsModule, CompaniesSustainableGoalsModule, 
    CompaniesPhotosModule, 
    CompaniesConnectionsModule, CompaniesMilestonesModule, 
    RiskAnalysisModule, RiskAssessmentsModule, CompaniesLeadListModule, CompaniesPitchDecksModule, 
    CompaniesCostAndRevenuesModule, CompaniesValuesModule, CompaniesCompetitionsModule,
    CompaniesMarketPotentialsModule, CompaniesCustomersSegmentationsModule, CompaniesRelationsModule,
    RelationsModule, ChannelsModule, CompaniesConversationsModule, CompaniesConversationsMembersModule, 
    CompaniesConversationsMessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
