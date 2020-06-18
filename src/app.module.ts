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
import { CompanyRiskAnalysisUsersModule } from './modules/companies-risk-analysis-users/company-risk-analysis-users.module';
import { CompaniesLeadListModule } from './modules/companies-lead-list/companies-lead-list.module';
import { CompaniesPitchDecksModule } from './modules/companies-pitch-decks/companies-pitch-decks.module';
import { CompaniesCostAndRevenuesModule } from './modules/companies-cost-and-revenues/companies-cost-and-revenues.module';
import { CompaniesValuesModule } from './modules/companies-values/companies-values.module';
import { CompaniesCompetitionsModule } from './modules/companies-competitions/companies-competitions.module';
import { CompaniesMarketPotentialsModule } from './modules/companies-market-potentials/companies-market-potentials.module';
import { CompaniesRelationsModule } from './modules/companies-relations/companies-relations.module';
import { RelationsModule } from './modules/relations/relations.module';
import { ChannelsModule } from './modules/channels/channels.module';
import { CompaniesConversationsModule } from './modules/companies-conversations/companies-conversations.module';
import { CompaniesConversationsMembersModule } from './modules/companies-conversations-members/companies-conversations-members.module';
import { CompaniesConversationsMessagesModule } from './modules/companies-conversations-messages/companies-conversations-messages.module';
import { CompaniesMarketPotentialFilesModule } from './modules/companies-market-potential-files/companies-market-potential-files.module';
import { CompaniesMarketPotentialEstimatesCoverageModule } from './modules/companies-market-potential-estimates-coverage/companies-market-potential-estimates-coverage.module';
import { CompaniesMarketPotentialCustomersModule } from './modules/companies-market-potential-customers/companies-market-potential-customers.module';
import { EducationStagesModule } from './modules/education-stages/education-stages.module';
import { IncomeBracketsModule } from './modules/income-brackets/income-brackets.module';
import { CustomerSegmentationTypeModule } from './modules/customer-segmentation-type/customer-segmentation-type.module';
import { CustomerSegmTypeSubcategoryModule } from './modules/customer-segm-type-subcategory/customer-segm-type-subcategory.module';
import { CustomerSegmTypeSubcategoryValuesModule } from './modules/customer-segm-type-subcategory-values/customer-segm-type-subcategory-values.module';
import { CompaniesCustomerSegmentDetailsModule } from './modules/companies-customer-segment-details/companies-customer-segment-details.module';
import { CompaniesCustomersProblemsModule } from './modules/companies-customers-problems/companies-customers-problems.module';
import { CompaniesCustomersProblemsSolutionsModule } from './modules/companies-customers-problems-solutions/companies-customers-problems-solutions.module';
import { CompaniesConnectionGroupsModule } from './modules/companies-connection-groups/companies-connection-groups.module';
import { CompaniesConnectionGroupsLeadlistModule } from './modules/companies-connection-groups-leadlist/companies-connection-groups-leadlist.module';
import { CompaniesCustomersModule } from './modules/companies-customers/companies-customers.module'
import { DetailsModule } from './modules/channels/details/details.module'

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
    CompaniesMarketPotentialsModule, CompaniesRelationsModule,
    RelationsModule, ChannelsModule, CompaniesConversationsModule, CompaniesConversationsMembersModule, 
    CompaniesConversationsMessagesModule, CompanyRiskAnalysisUsersModule, CompaniesMarketPotentialFilesModule, 
    CompaniesMarketPotentialEstimatesCoverageModule, CompaniesMarketPotentialCustomersModule, EducationStagesModule, 
    IncomeBracketsModule, CustomerSegmentationTypeModule, CustomerSegmTypeSubcategoryModule, CustomerSegmTypeSubcategoryValuesModule,
     CompaniesCustomerSegmentDetailsModule, CompaniesCustomersProblemsModule, CompaniesCustomersProblemsSolutionsModule, 
     CompaniesConnectionGroupsModule, CompaniesConnectionGroupsLeadlistModule,
     CompaniesCustomersModule, DetailsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
