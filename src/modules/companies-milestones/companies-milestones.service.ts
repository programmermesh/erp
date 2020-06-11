import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { CompanyMilestonesEntity as CompanyMilestone } from './company-milestones.entity'
import { CreateCompanyMilestoneDto } from './dto/create-company-milestone.dto'
import { UpdateCompanyMilestoneDto } from './dto/update-company-milestone.dto'

@Injectable()
export class CompaniesMilestonesService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(CompanyMilestone) private readonly companyMilestoneRepo: Repository<CompanyMilestone> 
    ){}
    private logger = new Logger('CompaniesMilestonesService')
    private entity_prefix_name: string = 'Company Milestone'
    
    async getAll( params: ValidParamId, user: User ): Promise<CompanyMilestone[]>{
        return await this.companyMilestoneRepo.find({
            select:[
                "id","title" , "description", "milestone_archived",
                "createdAt", "updatedAt", "year", "month" 
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
        const requestFound = await this.findCompanyMilestoneById(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyMilestoneDto): Promise<any>{
        const requestFound = await this.companyMilestoneRepo.findOne({ 
            where: { 
                title: newData.title,
                company:{
                    id: params.companyId,
                    created_by: user
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.title}' already exists`)
        }else{   
            try {    
                const newEntry = new CompanyMilestone()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.companyMilestoneRepo.merge(newEntry, saveThis)                   

                const result = await this.companyMilestoneRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCompanyMilestoneDto): Promise<any>{
        
        const requestFound = await this.findCompanyMilestoneById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.companyMilestoneRepo.merge(requestFound, updateData)
            const result = await this.companyMilestoneRepo.save(requestFound)
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
        const requestFound = await this.companyMilestoneRepo.findOne({ 
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

        const result = await this.companyMilestoneRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCompanyMilestoneById(params: ValidParamId, user: User){
        const requestFound = await this.companyMilestoneRepo.findOne({ 
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
