import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './modules/companies/companies.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomerSegmentsModule } from './modules/customer-segments/customer-segments.module';
import { CompaniesCustomerSegmentsModule } from './modules/companies-customer-segments/companies-customer-segments.module';
import { BusinessSectorsModule } from './modules/business-sectors/business-sectors.module';
import { CompaniesBusinessSectorsModule } from './modules/companies-business-sectors/companies-business-sectors.module';
import { BusinessStagesModule } from './modules/business-stages/business-stages.module';
import { CompaniesBusinessStagesModule } from './modules/companies-business-stages/companies-business-stages.module';
import { CompaniesTeamMembersModule } from './modules/companies-team-members/companies-team-members.module';
import { CompaniesUserRolesModule } from './modules/companies-user-roles/companies-user-roles.module';
import { AccessTypesModule } from './modules/access-types/access-types.module';
import { SustainableGoalsModule } from './modules/sustainable-goals/sustainable-goals.module';
import { CompaniesSustainableGoalsModule } from './modules/companies-sustainable-goals/companies-sustainable-goals.module';
import { CompaniesPhotosModule } from './modules/companies-photos/companies-photos.module';
import { CompaniesConnectionsModule } from './modules/companies-connections/companies-connections.module';
import { CompaniesMilestonesModule } from './modules/companies-milestones/companies-milestones.module';
import { RiskAnalysisModule } from './modules/companies-risks/risk-analysis/risk-analysis.module';
import { RiskAssessmentsModule } from './modules/companies-risks/risk-assessments/risk-assessments.module';
import { CompaniesLeadListModule } from './modules/companies-lead-list/companies-lead-list.module';
import { CompaniesPitchDecksModule } from './modules/companies-pitch-decks/companies-pitch-decks.module';
import { CompaniesCostAndRevenuesModule } from './modules/companies-cost-and-revenues/companies-cost-and-revenues.module';
import { CompaniesValuesModule } from './modules/companies-values/companies-values.module';
import { CompaniesCompetitionsModule } from './modules/companies-competitions/companies-competitions.module';
import { CompaniesMarketPotentialsModule } from './modules/companies-market-potentials/companies-market-potentials.module';
import { CompaniesCustomersSegmentationsModule } from './modules/companies-customers-segmentations/companies-customers-segmentations.module';
import { CompaniesRelationsModule } from './modules/companies-relations/companies-relations.module';
import { RelationsModule } from './modules/relations/relations.module';
import { ChannelsModule } from './modules/channels/channels.module';
import { CompaniesConversationsModule } from './modules/companies-conversations/companies-conversations.module';
import { CompaniesConversationsMembersModule } from './modules/companies-conversations-members/companies-conversations-members.module';
import { CompaniesConversationsMessagesModule } from './modules/companies-conversations-messages/companies-conversations-messages.module';

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
