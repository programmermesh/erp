import { Injectable, NotFoundException, Logger, InternalServerErrorException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../../companies/company.entity'
import { UserEntity as User } from '../../users/user.entity'
import { ValidParamId } from '../../../common/valid-param-id.dto';
import { RiskAnalysisEntity as RiskAnalysis } from './risk-analysis.entity'
//import { RiskAnalysisUserEntity as RiskAnalysisUser } from '../../companies-risk-analysis-users/risk-analysis-user.entity'
import { CreateCompanyRiskAnalysisDto } from './dto/create-company-risk-analysis.dto'
import { UpdateCompanyRiskAnalysisDto } from './dto/update-company-risk-analysis.dto'
import { CompanyRiskAnalysisUsersService } from '../../companies-risk-analysis-users/company-risk-analysis-users.service'

@Injectable()
export class RiskAnalysisService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(RiskAnalysis) private readonly companyRiskAnalysisRepo: Repository<RiskAnalysis>,
        //@InjectRepository(RiskAnalysisUser) private readonly riskAnalysisUserRepo: Repository<RiskAnalysisUser> ,
        @Inject('CompanyRiskAnalysisUsersService') private readonly CompanyRiskAnalysisUsersService: CompanyRiskAnalysisUsersService
    ){}
    private logger = new Logger('RiskAnalysissService')
    private entity_prefix_name: string = 'Company Risk Analysis'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{

        const result = await this.companyRiskAnalysisRepo.createQueryBuilder('risk_analysis')
            .leftJoin('risk_analysis.company', 'company')
            // .where("company.created_by = :owner", {owner: user.id })
            .where("company.id = :id", { id: params.companyId})
            .leftJoinAndSelect('risk_analysis.risk_analysis_users','risk_analysis_users')
            .leftJoinAndSelect('risk_analysis_users.company_team_members','company_team_members')
            .leftJoinAndSelect('company_team_members.role', 'role')
            .leftJoinAndSelect('company_team_members.user','userInfo')
            .orderBy('risk_analysis.createdAt','DESC')              
            .getMany()  
        return { status: 'success', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const result = await this.findById(params, user)
        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyRiskAnalysisDto): Promise<any>{
        const requestFound = await this.companyRiskAnalysisRepo.findOne({ 
            where: { 
                title: newData.title,
                company:{
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with title '${newData.title}' already exists`)
        }else{   
            try {    
                const newEntry = new RiskAnalysis()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.companyRiskAnalysisRepo.merge(newEntry, saveThis)                   

                const result = await this.companyRiskAnalysisRepo.save(newEntry) 
                
                //WE ASSIGN THE TEAM MEMBERS
                const teamMembers = []
                const newParams: ValidParamId =new ValidParamId()
                newParams.companyId = params.companyId
                newParams.risk_analysisId = result.id
            

                for await (const iterator of newData.team_members) {
                    const formData = { company_team_membersId : iterator.id}
                    const result1 = await this.CompanyRiskAnalysisUsersService.create(newParams, user, formData)
                }

                //WE ASSIGN THE TEAM MEMBERS
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCompanyRiskAnalysisDto): Promise<any>{
        
        const requestFound = await this.findById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by cannot be found `)
        }

        try {
            this.companyRiskAnalysisRepo.merge(requestFound, updateData)
            const result = await this.companyRiskAnalysisRepo.save(requestFound)

            // FIRST DELETE ANY team members

            await this.CompanyRiskAnalysisUsersService.deleteManyByRiskAnalysisId(params.id)

            //WE ASSIGN THE TEAM MEMBERS
            
            const teamMembers = []
            const newParams: ValidParamId =new ValidParamId()
            newParams.companyId = params.companyId
            newParams.risk_analysisId = result.id
        

            for await (const iterator of updateData.team_members) {
                const formData = { company_team_membersId : iterator.id}
                const result1 = await this.CompanyRiskAnalysisUsersService.create(newParams, user, formData)
            }

            //WE ASSIGN THE TEAM MEMBERS
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }
    

    async delete(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.companyRiskAnalysisRepo.findOne({ 
            where: { 
                id: params.id,
                company: {
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.companyRiskAnalysisRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findById(params: ValidParamId, user: User){
        const requestFound = await this.companyRiskAnalysisRepo.findOne({ 
            where: { 
                id: params.id,
                company: {
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })
        return requestFound
    }
}
