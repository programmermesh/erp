import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../../companies/company.entity'
import { UserEntity as User } from '../../users/user.entity'
import { ValidParamId } from '../../../common/valid-param-id.dto';
import { RiskAnalysisEntity as RiskAnalysis } from './risk-analysis.entity'
import { CreateCompanyRiskAnalysisDto } from './dto/create-company-risk-analysis.dto'
import { UpdateCompanyRiskAnalysisDto } from './dto/update-company-risk-analysis.dto'

@Injectable()
export class RiskAnalysisService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(RiskAnalysis) private readonly companyRiskAnalysisRepo: Repository<RiskAnalysis> 
    ){}
    private logger = new Logger('RiskAnalysissService')
    private entity_prefix_name: string = 'Company Risk Analysis'
    
    async getAll( params: ValidParamId, user: User ): Promise<RiskAnalysis[]>{
        return await this.companyRiskAnalysisRepo.find({
            select:[
                "title" , "description", "type","consequences", "likelihood",
                "id","createdAt", "updatedAt"
            ],
            where: {
                company:{
                    id: params.companyId,
                    created_by: user
                }
            },            
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findCompanyCostAndRevenueById(params, user)
        if(requestFound){
            return requestFound
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
                    created_by: user
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
        
        const requestFound = await this.findCompanyCostAndRevenueById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by cannot be found `)
        }

        try {
            this.companyRiskAnalysisRepo.merge(requestFound, updateData)
            const result = await this.companyRiskAnalysisRepo.save(requestFound)
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
                    created_by: user
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

    private async findCompanyCostAndRevenueById(params: ValidParamId, user: User){
        const requestFound = await this.companyRiskAnalysisRepo.findOne({ 
            where: { 
                id: params.id,
                company: {
                    id: params.companyId,
                    created_by: user
                }
            } 
        })
        return requestFound
    }
}
