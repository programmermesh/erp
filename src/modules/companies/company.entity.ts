import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  ValueTransformer,
} from 'typeorm';
import { COMPANY_TYPE } from '../../common/enum_values';
import { AbstractEntity } from '../../common/abstract.entity';
import { UserEntity } from '../users/user.entity';
import { CompanyTeamMembersEntity } from '../companies-team-members/company-team-members.entity';
import { RolesEntity } from '../companies-user-roles/roles.entity';
import { CompanyCustomerSegmentsEntity } from '../companies-customer-segments/company-customer-segments.entity';
import { CompanyBusinessSectorsEntity } from '../companies-business-sectors/company-business-sectors.entity';
import { CompanyBusinessStagesEntity } from '../companies-business-stages/company-business-stages.entity';
import { CompanySustainableGoalsEntity } from '../companies-sustainable-goals/company-sustainable-goals.entity';
import { CompanyValuesEntity } from '../companies-values/company-values.entity';
import { CostAndRevenuesEntity } from '../companies-cost-and-revenues/cost-and-revenues.entity';
import { ConnectionGroupsEntity } from '../companies-connection-groups/connection-groups.entity';
import { CompanyMilestonesEntity } from '../companies-milestones/company-milestones.entity';
import { PitchDecksEntity } from '../companies-pitch-decks/pitch-decks.entity';
import { MarketPotentialEntity } from '../companies-market-potentials/market-potential.entity';
import { RiskAnalysisEntity } from '../companies-risks/risk-analysis/risk-analysis.entity';
import { RiskAssessmentEntity } from '../companies-risks/risk-assessments/risk-assessment.entity';
import { CompanyNetworksEntity } from '../companies-network/company-networks.entity';
import { NetworkConversationEntity } from '../companies-conversations/company-conversation.entity';
import { CompanyRelationEntity } from '../companies-relations/company-relation.entity';
import { CompetitorEntity } from '../companies-competitions/competitor.entity';
import { ConversationsMembersEntity } from '../companies-conversations-members/conversations-members.entity';
import { ConnectionGroupsLeadListEntity } from '../companies-connection-groups-leadlist/connection-groups-lead-list.entity'; /*THIS IS THE LEADLIST TABLE*/
import { CustomerEntity } from '../companies-customers/customer.entity';
import { ChannelsEntity } from '../companies-channels/channels.entity';
import { ConnectedHubEntity } from '../companies-connected-hub/connected-hub.entity';
import { ResourcesActivitiesPartnersEntity } from '../companies-resources-activities-partners/resources-activities-partners.entity';
import { PerformanceIndicatorCustomerEntity } from '../companies-performance-indicator-customers/customer.entity';
import { PerformanceIndicatorRevenueEntity } from '../companies-performance-indicator-revenue/revenue.entity';
import { PerformanceIndicatorCostEntity } from '../companies-performance-indicator-cost/cost.entity';
import { TaskManagerEntity } from '../task-manager/task-manager.entity';

export const bigint: ValueTransformer = {
  to: (entityValue: number) => (entityValue ? entityValue : 0),
  from: (databaseValue: string): number =>
    parseInt(databaseValue ? databaseValue : '0', 10),
};
@Entity('company')
export class CompanyEntity extends AbstractEntity {
  @Column('varchar', { length: 500 })
  company_name: string;

  @Column('varchar', { length: 500, nullable: true })
  department: string;

  @Column('varchar', { length: 500, nullable: true })
  role: string;

  @Column('varchar', { length: 200, nullable: true })
  country: string;

  @Column('varchar', { length: 200, nullable: true })
  city: string;

  @Column('varchar', { nullable: true })
  team_size: string;

  @Column('varchar', { nullable: true })
  business_objectives: string;

  @Column('varchar', { nullable: true })
  investors_time_reference: string;

  @Column({ type: 'boolean', default: true })
  interested_in_investment?: boolean;

  @Column('text', { nullable: true })
  vision?: string;

  @Column({ type: 'boolean', default: false })
  is_vision_completed?: boolean;

  @Column('text', { nullable: true })
  mission?: string;

  @Column({ type: 'boolean', default: false })
  is_mission_completed?: boolean;

  @Column('text', { nullable: true })
  logo?: string;

  @Column('text', { nullable: true })
  profile_photo: string;

  @Column('text', { nullable: true })
  elevator_pitch?: string;

  @Column({
    type: 'enum',
    enum: COMPANY_TYPE,
    default: COMPANY_TYPE.business,
  })
  company_type: COMPANY_TYPE;

  @Column({ type: 'varchar', length: 200, nullable: true })
  updated_by?: string;

  /* Many Companies can be created by one user */
  @ManyToOne(
    type => UserEntity,
    user => user.owner,
  )
  created_by: UserEntity;

  // /*One company can have many task*/
  // @OneToMany(
  //   type => TaskManagerEntity,
  //   task => task.task_company,
  // )
  // task: TaskManagerEntity[];

  // One company can have many users last access
  @OneToMany(
    type => UserEntity,
    users => users.last_accessed_company,
  )
  last_accessed_by_user: UserEntity[];

  /* One company can have many team members */
  @OneToMany(
    type => CompanyTeamMembersEntity,
    team_member => team_member.company,
  )
  team_members: CompanyTeamMembersEntity[];

  /* One company can have many channels */
  @OneToMany(
    type => ChannelsEntity,
    channels => channels.company,
  )
  channels: ChannelsEntity[];

  /* One company can have many customer segments */
  @OneToMany(
    type => CompanyCustomerSegmentsEntity,
    customer_segment => customer_segment.company,
  )
  customer_segments: CompanyCustomerSegmentsEntity[];

  /* One company can be in many business sectors */
  @OneToMany(
    type => CompanyBusinessSectorsEntity,
    business_sector => business_sector.company,
  )
  business_sectors: CompanyBusinessSectorsEntity[];

  /* One company can have many business stages */
  @OneToMany(
    type => CompanyBusinessStagesEntity,
    business_stage => business_stage.company,
  )
  business_stages: CompanyBusinessStagesEntity[];

  /* One company can have many sustainable goals */
  @OneToMany(
    type => CompanySustainableGoalsEntity,
    sustainable_goal => sustainable_goal.company,
  )
  sustainable_goals: CompanySustainableGoalsEntity[];

  /* One company can have many roles*/
  @OneToMany(
    type => RolesEntity,
    role => role.company,
  )
  roles: RolesEntity[];

  /* One company can have many values */
  @OneToMany(
    type => CompanyValuesEntity,
    value => value.company,
  )
  values: CompanyValuesEntity[];

  /* A company can have many cost and revenues entities */
  @OneToMany(
    type => CostAndRevenuesEntity,
    costs_and_revenues => costs_and_revenues.company,
  )
  costs_and_revenues: CostAndRevenuesEntity[];

  /* A company can have many resources_activities_partners entities */
  @OneToMany(
    type => ResourcesActivitiesPartnersEntity,
    resources_activities_partners => resources_activities_partners.company,
  )
  resources_activities_partners: CostAndRevenuesEntity[];

  /* A Company can have many customer segments */
  @OneToMany(
    type => CustomerEntity,
    customers => customers.company,
  )
  customers: CustomerEntity[];

  /* One company can have many connections groups */
  @OneToMany(
    type => ConnectionGroupsEntity,
    connection_group => connection_group.company,
  )
  connection_groups: ConnectionGroupsEntity[];

  /* One company can be added as a lead list by many other companies (have any leadlist entties) */
  @OneToMany(
    type => ConnectionGroupsLeadListEntity,
    lead_list => lead_list.lead_list_company,
  )
  lead_lists: ConnectionGroupsLeadListEntity[];

  // /* One company can have many lead list */
  // @OneToMany( type => LeadListEntity, lead_list => lead_list.main_company)
  // lead_lists: LeadListEntity[]

  // /* One company can have many entities as a lead company */
  // @OneToMany( type => LeadListEntity, lead_list => lead_list.added_lead_company)
  // lead_lists_company: LeadListEntity[]

  /* One compnay can have many milestones */
  @OneToMany(
    type => CompanyMilestonesEntity,
    company_milestones => company_milestones.company,
  )
  company_milestones: CompanyMilestonesEntity[];

  /* One company can have many pick decks */
  @OneToMany(
    type => PitchDecksEntity,
    pick_decks => pick_decks.company,
  )
  pick_decks: PitchDecksEntity[];

  /* One company can have many connected hub details*/
  @OneToMany(
    type => ConnectedHubEntity,
    connected_hub => connected_hub.company,
  )
  connected_hubs: PitchDecksEntity[];

  /* One company can have many market potentials */
  @OneToMany(
    type => MarketPotentialEntity,
    market_potential => market_potential.company,
  )
  market_potentials: MarketPotentialEntity[];

  /* One company can have many risk analysis */
  @OneToMany(
    type => RiskAnalysisEntity,
    risks_analysis => risks_analysis.company,
  )
  risks_analysis: RiskAnalysisEntity[];

  /* One company can have many risk assessments */
  @OneToMany(
    type => RiskAssessmentEntity,
    risks_assessment => risks_assessment.company,
  )
  risks_assessments: RiskAssessmentEntity[];

  /* One company can have many connections */
  @OneToMany(
    type => CompanyNetworksEntity,
    company_network => company_network.company,
  )
  company_networks: CompanyNetworksEntity[];

  /* One company can have many entiries on the network table as connected_to */
  @OneToMany(
    type => CompanyNetworksEntity,
    company_network => company_network.invited_company,
  )
  company_to_company_network: CompanyNetworksEntity[];

  /* One company can create many Conversations */
  @OneToMany(
    type => NetworkConversationEntity,
    network_conversation => network_conversation.company,
  )
  network_converstaions: NetworkConversationEntity[];

  /* One company can have many company_relations */
  @OneToMany(
    type => CompanyRelationEntity,
    company_relation => company_relation.companies,
  )
  company_relations: CompanyRelationEntity[];

  /* One company can have many competitors */
  @OneToMany(
    type => CompetitorEntity,
    competitor => competitor.company,
  )
  competitors: CompetitorEntity[];

  /* One company can be a member in many conversations */
  @OneToMany(
    type => ConversationsMembersEntity,
    conversation_member => conversation_member.company,
  )
  conversation_members: ConversationsMembersEntity[];

  @OneToMany(
    type => PerformanceIndicatorCustomerEntity,
    performance_indicator_customers => performance_indicator_customers.company,
  )
  performance_indicator_customers: PerformanceIndicatorCustomerEntity[];

  @OneToMany(
    type => PerformanceIndicatorRevenueEntity,
    performance_indicator_revenues => performance_indicator_revenues.company,
  )
  performance_indicator_revenues: PerformanceIndicatorRevenueEntity[];

  @OneToMany(
    type => PerformanceIndicatorCostEntity,
    performance_indicator_cost => performance_indicator_cost.company,
  )
  performance_indicator_cost: PerformanceIndicatorRevenueEntity[];
}
