import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { CreateCompanyBusinessStageDto } from './dto/create-company-business-stage.dto'
import { CompanyBusinessStagesEntity as CompanyBusinessStage } from './company-business-stages.entity'
import { BusinessStagesEntity as BusinessStage } from '../business-stages/business-stages.entity'
import { BulkCompanyBusinessStagesDto } from './dto/bulk-create-business-stage.dto';

@Injectable()
export class CompaniesBusinessStagesService {
    constructor(
        @InjectRepository(CompanyBusinessStage) private readonly companyBusinessStageRepo: Repository<CompanyBusinessStage>,
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(BusinessStage) private readonly businessStageRepo: Repository<BusinessStage>
    ){}

    private logger = new Logger('CompanyBusinessStagesService')
    private entity_prefix_name: string = 'Company business stage'
    
    async getAll(params: ValidParamId, user: User): Promise<any>{
        const result = await this.companyBusinessStageRepo.find({
            where: {
                company: {
                    id: params.companyId,
                    // created_by: user
                }                
            },
            relations: ['business_stage']
        });
        return { status: 'success', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{

        const requestFound = await this.findOneEntityById(params,user)
        
        if(requestFound){
            return { status: 'success', result: requestFound }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyBusinessStageDto): Promise<any>{
        const requestFound = await this.companyBusinessStageRepo.findOne({
            where: {
                business_stage: newData.business_stage ,
                company: { 
                    id: params.companyId , 
                    // created_by: user 
                } 
            }                     
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} already exists`)
        }else{ 
            
            try {   
                const newEntry = new CompanyBusinessStage()
                newEntry.company = await this.companyRepo.findOne(params.companyId)
                newEntry.business_stage = await this.businessStageRepo.findOne(newData.business_stage)
                const result = await this.companyBusinessStageRepo.save(newEntry)                
                
                return Promise.resolve({
                    status: 'success',
                    result: { id: result.id }
                })
            } catch(error){
                this.logger.error(error.message, error.stack)
                throw new InternalServerErrorException()
            }
        }
        
    }


    // CRETING BULK BUSINESS STAGES
    async createBulk(params: ValidParamId, user: User, newData: BulkCompanyBusinessStagesDto): Promise<any>{
        
        /// First delete all the existing entried
        const deleteExisting = await this.companyBusinessStageRepo.delete({
            company: { 
                id: params.companyId , 
                // created_by: user 
            }
        })

        const company = await this.companyRepo.findOne(params.companyId)
        try {
            
            let savedData = await this.saveBusinessStages(company, newData.business_stages)
            return {
                status: 'success',
                result: savedData
            }  
        } catch(error){
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }
        
    }

    private async saveBusinessStages(company: Company, data: any) {        
        let result = []
        for (const [idx, element] of data.entries()) {
            const newEntry = new CompanyBusinessStage()
            newEntry.company = company
            newEntry.business_stage = await this.businessStageRepo.findOne(element.id)
            const newResult = await this.companyBusinessStageRepo.save(newEntry)  
            result.push(newResult)
        }  
        return result              
    }

    
    async delete(params : ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findOneEntityById(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.companyBusinessStageRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findOneEntityById(params: ValidParamId, user: User){
        const requestFound = await this.companyBusinessStageRepo.findOne({
            where: { 
                id: params.id,
                company: { 
                    id: params.companyId ,
                    // created_by: user 
                } 
            }                      
        })

        return requestFound
    }
}
