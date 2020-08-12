import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanySustainableGoalsEntity as CompanySustainableGoal } from './company-sustainable-goals.entity'
import { CompanyEntity as Company } from '../companies/company.entity'
import { SustainableGoalEntity as SustainableGoal } from '../sustainable-goals/sustainable-goal.entity'
import { UserEntity as User } from '../users/user.entity'
import { CreateCompanySustainableGoalDto } from './dto/create-company-sustainable-goal.dto'
import { UpdateCompanySustainableGoalDto } from './dto/update-company-sustainable-goal.dto'
import { ValidParamId } from '../../common/valid-param-id.dto'

@Injectable()
export class CompaniesSustainableGoalsService {
    constructor (
        @InjectRepository(CompanySustainableGoal) private readonly companySustainableGoalRepo: Repository<CompanySustainableGoal>,
        @InjectRepository(SustainableGoal) private readonly sustainableGoalRepo: Repository<SustainableGoal>,
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>
    ){}
    private logger = new Logger('CompanySustainableGoalsService')
    private entity_prefix_name: string = 'Company Sustainable Goal'
    
    async getAll(params: ValidParamId): Promise<any>{
        const result = await this.companySustainableGoalRepo.find({
            where: {
                company: {
                    id: params.companyId
                }                
            },            
            order: {
                createdAt: 'DESC'
            },
            relations: ['sustainable_goal']
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

    async from_registration(params: ValidParamId, newData: CreateCompanySustainableGoalDto): Promise<any>{
        const requestFound = await this.companySustainableGoalRepo.findOne({
            where: {
                sustainable_goal: newData.sustainable_goal,  
                company: { 
                    id: params.companyId 
                } 
            }                     
        })

        if(requestFound){            
            const { sustainable_goal, ...updateThis } = newData
            this.companySustainableGoalRepo.merge(requestFound, updateThis)            
            const update = await this.companySustainableGoalRepo.save(requestFound)
            return {
                status: 'success',
                result: update
            }
        }else{ 
            
            try {   
                const newEntry = new CompanySustainableGoal()
                newEntry.objective = newData.objective
                newEntry.description = newData.description
                newEntry.active = newData.active? newData.active : false
                newEntry.company = await this.companyRepo.findOne(params.companyId)
                newEntry.sustainable_goal = await this.sustainableGoalRepo.findOne(newData.sustainable_goal)
                
                const result = await this.companySustainableGoalRepo.save(newEntry)                
                
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

    async create(params: ValidParamId, user: User, newData: CreateCompanySustainableGoalDto): Promise<any>{
        const requestFound = await this.companySustainableGoalRepo.findOne({
            where: {
                sustainable_goal: newData.sustainable_goal,  
                company: { 
                    id: params.companyId , 
                    created_by: user 
                } 
            },
            relations: ['sustainable_goal']                     
        })
        if(requestFound){
            //throw new NotFoundException(`${this.entity_prefix_name} with ID '${newData.sustainable_goal}' already exists`)
            
            const { sustainable_goal, ...updateThis } = newData
            this.companySustainableGoalRepo.merge(requestFound, updateThis)
            
            const update = await this.companySustainableGoalRepo.save(requestFound)
            return {
                status: 'success',
                message: 'Sustatinable Already assigned to company',
                result: {
                    id: update.id,
                    objective: update.objective,
                    description: update.description
                }
            }
        }else{ 
            
            try {   
                const newEntry = new CompanySustainableGoal()
                newEntry.objective = newData.objective
                newEntry.description = newData.description
                newEntry.active = newData.active? newData.active : false
                newEntry.company = await this.companyRepo.findOne(params.companyId)
                newEntry.sustainable_goal = await this.sustainableGoalRepo.findOne(newData.sustainable_goal)
                
                const result = await this.companySustainableGoalRepo.save(newEntry)                
                
                return Promise.resolve({
                    status: 'success',
                    result: {
                        id: result.id,
                        objective: result.objective,
                        description: result.description
                    }
                })
            } catch(error){
                this.logger.error(error.message, error.stack)
                throw new InternalServerErrorException()
            }
        }
        
    }

    async update(params: ValidParamId, user: User, updateData: UpdateCompanySustainableGoalDto): Promise<any>{
        
        const requestFound = await this.findOneEntityById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.companySustainableGoalRepo.merge(requestFound, updateData)
            const result = await this.companySustainableGoalRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }

    async delete(params : ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findOneEntityById(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.companySustainableGoalRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findOneEntityById(params: ValidParamId, user: User){
        const requestFound = await this.companySustainableGoalRepo.findOne({
            where: { 
                id: params.id, 
                company: { 
                    id: params.companyId , 
                    created_by: user 
                } 
            },
            order: {
                createdAt: 'DESC'
            }                    
        })

        return requestFound
    }
}
