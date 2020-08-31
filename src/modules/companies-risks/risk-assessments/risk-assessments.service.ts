import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../../companies/company.entity'
import { UserEntity as User } from '../../users/user.entity'
import { ValidParamId } from '../../../common/valid-param-id.dto';
import { RiskAssessmentEntity as RiskAssessment } from './risk-assessment.entity'
import { CreateRiskAssessmentDto } from './dto/create-risk-assessment.dto'
import { UpdateRiskAssessmentDto } from './dto/update-risk-assessment.dto'

@Injectable()
export class RiskAssessmentsService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(RiskAssessment) private readonly companyRiskAssessmentRepo: Repository<RiskAssessment> 
    ){}
    private logger = new Logger('RiskAssessmentsService')
    private entity_prefix_name: string = 'Company Risk Assessment'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{
        const result = await this.companyRiskAssessmentRepo.find({
            select:[
                "title" , "description", "type",
                "id","createdAt", "updatedAt"
            ],
            where: {
                company:{
                    id: params.companyId,
                    //created_by: user
                }
            },            
            order: {
                createdAt: 'DESC'
            }
        });
        return { status: 'succcess', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const result = await this.findById(params, user)
        if(result){
            return { status: 'succcess', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateRiskAssessmentDto): Promise<any>{
        const requestFound = await this.companyRiskAssessmentRepo.findOne({ 
            where: { 
                title: newData.title,
                type: newData.type,
                company:{
                    id: params.companyId
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with title '${newData.title}' already exists`)
        }else{   
            try {    
                const newEntry = new RiskAssessment()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.companyRiskAssessmentRepo.merge(newEntry, saveThis)                   

                const result = await this.companyRiskAssessmentRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateRiskAssessmentDto): Promise<any>{
        
        const requestFound = await this.findById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by cannot be found `)
        }

        try {
            this.companyRiskAssessmentRepo.merge(requestFound, updateData)
            const result = await this.companyRiskAssessmentRepo.save(requestFound)
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
        const requestFound = await this.companyRiskAssessmentRepo.findOne({ 
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

        const result = await this.companyRiskAssessmentRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findById(params: ValidParamId, user: User){
        const requestFound = await this.companyRiskAssessmentRepo.findOne({ 
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
