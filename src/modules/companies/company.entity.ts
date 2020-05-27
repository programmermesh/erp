import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany
} from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsOptional,
  IsNotEmpty
  } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { UserEntity } from '../users/user.entity'
import { CompanyTeamMembersEntity } from '../companies-team-members/company-team-members.entity'
import { RolesEntity } from '../companies-user-roles/roles.entity'
import { CompanyCustomerSegmentsEntity } from '../companies-customer-segments/company-customer-segments.entity'
import { CompanyBusinessSectorsEntity } from '../companies-business-sectors/company-business-sectors.entity';
import { CompanyBusinessStagesEntity } from '../companies-business-sectors/company-business-stages.entity'
import { CompanySustainableGoalsEntity } from '../companies-sustainable-goals/company-sustainable-goals.entity'
import { CompanyValuesEntity } from './company-values.entity'
import { CostAndRevenuesEntity } from './cost-and-revenues.entity'
import { ConnectionGroupsEntity } from '../../lead-list/connection-groups.entity'
import { LeadListEntity } from '../../lead-list/lead-list.entity'
import { CompanyMilestonesEntity } from '../companies-milestones/company-milestones.entity'
import { PitchDecksEntity } from '../companies-pitch-decks/pitch-decks.entity'
import { MarketPotentialEntity } from '../../market-potentials/market-potential.entity'
import { RiskAnalysisEntity } from '../../risks/risk-analysis.entity'
import { RiskAssessmentEntity } from '../../risks/risk-assessment.entity'
import { CompanyNetworksEntity } from '../../network-connections/company-networks.entity'
import { NetworkConversationEntity } from '../../network-connections/network-conversation.entity'
import { CompanyRelationEntity } from '../../relations-and-channels/company-relation.entity'
import { CompetitorEntity } from '../companies-competitions/competitor.entity'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('company')
export class CompanyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({ description: 'This is the name of the company' })
    @Column('varchar', { length: 500, unique: true })
    name: string

    @ApiProperty()
    @ApiPropertyOptional()
    @Column('varchar', { length: 200, nullable: true })
    address: string

    @ApiProperty()
    @Column('varchar', { length: 200 })
    country: string

    @ApiProperty()
    @Column('varchar', { length: 200 })
    city: string

    @ApiProperty({ description: 'This is the email of the company. Will be unique' })
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 255, unique: true })
    email: string

    @ApiProperty()
    @Column('varchar', { length: 100 })
    phone: string

    @ApiProperty({ description: 'This is the email of the company website URI' })
    @ApiPropertyOptional()
    @Column('varchar', { nullable: true })
    website: string

    @ApiProperty({ description: 'This is the size of the company', minimum:1, default: 1 })
    @ApiPropertyOptional()
    @Column('int', { nullable: true})
    customer_size: number

    @ApiProperty({ description: 'This is the minimum investment amount of the company looking for ', minimum:1, default: 1 })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @Column('int', { nullable: true})
    minimum_investment_amount?: number

    @ApiProperty({ description: 'This is the maximum investment amount of the company looking for ', minimum:1, default: 1 })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @Column('int', { nullable: true})
    max_investment_amount?: number

    @ApiProperty({ description: 'This is a determining column set to true if the company is interested in getting investments.', default: true })
    @Column({ type: 'boolean', default: true })
    @ApiPropertyOptional()
    interested_in_investment?: boolean

    @ApiProperty({ description: 'This is a field where the company states its vision', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    vision?: string

    @ApiProperty({ description: 'This is a field where the company states its mission', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    mission?: string

    @ApiProperty({
      description: 'This is a field where the company states the date it was established',
      default: ""
    })
    @Column('date', { nullable: true})
    date_of_establishment?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company logo', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    logo?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company profile photo', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    profile_photo: string

    @ApiProperty({ description: 'This is a field will have the company elevator pitch ', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    elevator_pitch?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company facebook page', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    facebook?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company linkedin page', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    linkedin?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company twitter page', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    twitter?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company youtube page', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    youtube?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company other page', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    others?: string

    @ApiProperty({
      description: 'This field will have the company\'s minimum valuation ', minimum:1, default: 1 })
    @ApiPropertyOptional()
    @Column('int', { nullable: true})
    min_valuation?: number

    @ApiProperty({ description: 'This field will have the company\'s maximum valuation ', minimum:1, default: 1 })
    @ApiPropertyOptional()
    @Column('int', { nullable: true})
    max_valuation?: number

    @ApiProperty({ description: 'This field will have the description for the company valuation', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    valuation_description?: string

    @ApiProperty({ description: 'This field will describe the company type' })
    @ApiPropertyOptional()
    @Column({ type: 'varchar', length: 200, nullable: true})
    company_type?: string

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    create_at?: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date

    @ApiProperty({ description: 'This will be the ID of the user that last updated the company entity' })
    @ApiPropertyOptional()
    @Column({ type: 'varchar', length: 200, nullable: true })
    updated_by?: string
    
    /* one Company can only be created by one user  */
    @OneToOne(type => UserEntity)
    @JoinColumn()
    created_by: UserEntity
    
    /* One company can have many team members */
    @OneToMany( type => CompanyTeamMembersEntity, team_member => team_member.company)
    team_members: CompanyTeamMembersEntity[]

    /* One company can have many customer segments */
    @OneToMany( type => CompanyCustomerSegmentsEntity, customer_segment => customer_segment.company)
    customer_segments: CompanyCustomerSegmentsEntity[]

    /* One company can be in many business sectors */
    @OneToMany( type => CompanyBusinessSectorsEntity, business_sector => business_sector.company)
    business_sectors: CompanyBusinessSectorsEntity[]

    /* One company can have many business stages */
    @OneToMany( type => CompanyBusinessStagesEntity, business_stage => business_stage.company)
    business_stages: CompanyBusinessStagesEntity[]

    /* One company can have many sustainable goals */
    @OneToMany( type=> CompanySustainableGoalsEntity, sustainable_goal => sustainable_goal.company)
    sustainable_goals: CompanySustainableGoalsEntity[]

    /* One company can have many roles*/
    @OneToMany( type => RolesEntity, role => role.company)
    roles: RolesEntity[]

    /* One company can have many values */
    @OneToMany( type => CompanyValuesEntity, value => value.company)
    values: CompanyValuesEntity[]

    /* A company can have many cost and revenues entities */
    @OneToMany( type => CostAndRevenuesEntity, costs_and_revenues => costs_and_revenues.company)
    costs_and_revenues: CostAndRevenuesEntity[]

    /* One company can have many connections groups */
    @OneToMany( type => ConnectionGroupsEntity, connection_group => connection_group.company)
    connection_groups: ConnectionGroupsEntity[]

    /* One company can have many lead list */
    @OneToMany( type => LeadListEntity, lead_list => lead_list.main_company)
    lead_lists: LeadListEntity[]
    
    /* One company can have many entities as a lead company */
    @OneToMany( type => LeadListEntity, lead_list => lead_list.lead_company)
    lead_lists_company: LeadListEntity[]

    /* One compnay can have many milestones */
    @OneToMany( type => CompanyMilestonesEntity, company_milestones => company_milestones.milestone_archived)
    company_milestones: CompanyMilestonesEntity[]

    /* One company can have many pick decks */
    @OneToMany( type => PitchDecksEntity, pick_decks => pick_decks.company)
    pick_decks: PitchDecksEntity[]

    /* One company can have many market potentials */
    @OneToMany( type => MarketPotentialEntity, market_potential => market_potential.created_at)
    market_potentials: MarketPotentialEntity[]

    /* One company can have many risk analysis */
    @OneToMany( type => RiskAnalysisEntity, risks_analysis => risks_analysis.company )
    risks_analysis: RiskAnalysisEntity[]

    /* One company can have many risk assessments */
    @OneToMany( type => RiskAssessmentEntity, risks_assessment => risks_assessment.company)
    risks_assessments: RiskAssessmentEntity[]

    /* One company can have many connections */
    @OneToMany( type => CompanyNetworksEntity, company_network => company_network.company)
    company_networks: CompanyNetworksEntity[]

    /* One company can have many entiries on the network table as connected_to */
    @OneToMany( type => CompanyNetworksEntity, company_network => company_network.invited_company)
    company_to_company_network: CompanyNetworksEntity[]

    /* One company can create many Conversations */
    @OneToMany( type => NetworkConversationEntity, network_conversation => network_conversation.company )
    network_converstaions: NetworkConversationEntity[]

    /* One company can have many company_relations */
    @OneToMany( type => CompanyRelationEntity, company_relation => company_relation.companies )
    company_relations: CompanyRelationEntity[]

    /* One company can have many competitors */
    @OneToMany( type => CompetitorEntity, competitor => competitor.company )
    competitors: CompetitorEntity[] 
}
