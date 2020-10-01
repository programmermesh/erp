import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { ResourcesActivitiesPartnersEntity as ResourcesActivitiesPartners } from './resources-activities-partners.entity'
import { CreateDto } from './dto/create.dto'
import { UpdateDto } from './dto/update.dto'
import { ValidParamId } from '../../common/valid-param-id.dto';

@Injectable()
export class CompaniesResourcesActivitiesPartnersService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(ResourcesActivitiesPartners) private readonly resourcesActivitiesPartnersRepo: Repository<ResourcesActivitiesPartners> 
    ){}
    private logger = new Logger('CompaniesResourcesActivitiesPartnersService')
    private entity_prefix_name: string = 'Company Resource-Activities-Partners'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{
        const result = await this.resourcesActivitiesPartnersRepo.find({
            where: {
                company:{
                    id: params.companyId
                }
            },            
            order: {
                createdAt: 'DESC'
            }
        });
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

    async create(params: ValidParamId, user: User, newData: CreateDto): Promise<any>{
        const requestFound = await this.resourcesActivitiesPartnersRepo.findOne({ 
            where: { 
                title: newData.title,
                type: newData.type,
                company:{
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.title}' already exists`)
        }else{   
            try {    
                const newEntry = new ResourcesActivitiesPartners()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.resourcesActivitiesPartnersRepo.merge(newEntry, saveThis)                   

                const result = await this.resourcesActivitiesPartnersRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateDto): Promise<any>{
        
        const requestFound = await this.findById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        try {
            this.resourcesActivitiesPartnersRepo.merge(requestFound, updateData)
            const result = await this.resourcesActivitiesPartnersRepo.save(requestFound)
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
        const requestFound = await this.findById(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.resourcesActivitiesPartnersRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findById(params: ValidParamId, user: User){
        const requestFound = await this.resourcesActivitiesPartnersRepo.findOne({ 
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

