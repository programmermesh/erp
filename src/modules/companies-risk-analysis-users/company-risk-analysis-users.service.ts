import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { CreateRiskAnalysisUserDto } from './dto/create-company-risk-analysis-users.dto'
import { RiskAnalysisUserEntity as RiskAnalysisUser } from './risk-analysis-user.entity'
import { CompanyTeamMembersEntity as CompanyTeamMember } from '../companies-team-members/company-team-members.entity'
import { RiskAnalysisEntity as RiskAnalysis } from '../companies-risks/risk-analysis/risk-analysis.entity'

@Injectable()
export class CompanyRiskAnalysisUsersService {
    constructor(
        @InjectRepository(RiskAnalysisUser) private readonly riskAnalysisUserRepo: Repository<RiskAnalysisUser>,
        @InjectRepository(CompanyTeamMember) private readonly companyTeamMemberRepo: Repository<CompanyTeamMember>,
        @InjectRepository(RiskAnalysis) private readonly riskAnalysisRepo: Repository<RiskAnalysis>
       ){}
    
       private logger = new Logger('CompanyRiskAnalysisUsersService')
       private entity_prefix_name: string = 'Company risk analysis user'
       
       async getAll( params: ValidParamId, user: User ): Promise<RiskAnalysisUser[]>{
           return await this.riskAnalysisUserRepo.find({
               where: {
                   risk_analysis:{
                       id: params.risk_analysisId,
                       company: {
                           id: params.companyId,
                           // created_by: user
                       }
                   }               
               },            
               order: {
                   createdAt: 'DESC'
               },
               relations: ['company_team_members']
           });
       }
    
       async getById(params: ValidParamId, user: User): Promise<any>{
            const requestFound = await this.findCompanyRiskAnalysisUseryId(params, user)
            if(requestFound){
                return requestFound
            }else{
                throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
            } 
        }
    
        async create(params: ValidParamId, user: User, newData: CreateRiskAnalysisUserDto): Promise<any>{
            const requestFound = await this.riskAnalysisUserRepo.findOne({ 
                where: { 
                    risk_analysis: {
                        id: params.risk_analysisId,
                        company: {
                            id: params.companyId,
                            // created_by: user
                        }
                    },
                    company_team_members: newData.company_team_membersId
                } 
            })
            if(requestFound){
                throw new NotFoundException(`${this.entity_prefix_name} already assigned to team member with ID ${newData.company_team_membersId} `)
            }else{   
                try {    
                    const newEntry = new RiskAnalysisUser()
                    newEntry.risk_analysis = await this.riskAnalysisRepo.findOne(params.risk_analysisId)
                    newEntry.company_team_members = await this.companyTeamMemberRepo.findOne(newData.company_team_membersId)
                    
                    const result = await this.riskAnalysisUserRepo.save(newEntry)                
                    
                    return Promise.resolve({
                        status: 'success',
                        result
                    })
                } catch(error){
                    this.logger.error(error.message, error.stack)
                    throw new InternalServerErrorException()
                }
            }
            
        }
    
    
        async delete(params: ValidParamId, user: User): Promise<any>{
            const requestFound = await this.findCompanyRiskAnalysisUseryId(params,user)
    
            if(!requestFound){
                throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
            }
    
            const result = await this.riskAnalysisUserRepo.delete(params.id)
            if(result.affected === 0){
                throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
            }
    
            return Promise.resolve({
                result,
                status: 'success'
            })
        }

        async deleteManyByRiskAnalysisId(id): Promise<any>{
            try {
                await this.riskAnalysisUserRepo.createQueryBuilder('risk_analysis_users')
                    .where("risk_analysis = :id", { id })
                    .delete()
                    .execute()
                return true
            } catch (error) {
                throw new NotFoundException(`could not be deleted`)
            }
        }
    
        private async findCompanyRiskAnalysisUseryId(params: ValidParamId, user: User){
            const requestFound = await this.riskAnalysisUserRepo.findOne({ 
                where: {
                    id: params.id,
                    risk_analysis: {
                        id: params.risk_analysisId,
                        company: {
                            id: params.companyId
                        }
                    }     
                } 
            })
            return requestFound
        }
}
