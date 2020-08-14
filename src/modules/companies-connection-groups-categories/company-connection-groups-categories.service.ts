import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { ConnectionGroupsCategoryEntity as ConnectionGroupCategory } from './company-connection-group-category.entity'
import { ConnectionGroupsEntity as ConnectionGroup } from '../companies-connection-groups/connection-groups.entity'
import { CreateConnectionGroupsCategoryDto } from './dto/created.dto'

@Injectable()
export class CompanyConnectionGroupsCategoriesService {
    constructor (
        @InjectRepository(ConnectionGroup) private readonly connectionGroupRepo: Repository<ConnectionGroup>,
        @InjectRepository(ConnectionGroupCategory) private readonly companyConnectionGroupCategoryRepo: Repository<ConnectionGroupCategory> 
    ){}
    private logger = new Logger('CompaniesConnectionGroupService')
    private entity_prefix_name: string = 'Company Connection Groups'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{
        const result = await this.companyConnectionGroupCategoryRepo.find({
            select:[
                "name","connection_group",
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
        return { status: 'success', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findCompanyConnectionGroupCategoryById(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateConnectionGroupsCategoryDto): Promise<any>{
        const requestFound = await this.companyConnectionGroupCategoryRepo.findOne({ 
            where: { 
                name:newData.name.toUpperCase(),
                connection_group: params.connection_groupId
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.name}' already exists`)
        }else{   
            try {    
                const newEntry = new ConnectionGroupCategory()
                newEntry.name = newData.name
                newEntry.connection_group = await this.connectionGroupRepo.findOne(params.connection_groupId)                 

                const result = await this.companyConnectionGroupCategoryRepo.save(newEntry)
                
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

    // async update(params: ValidParamId, user: User, updateData: UpdateConnectionGroupsDto): Promise<any>{
        
    //     const requestFound = await this.findCompanyConnectionGroupById(params,user)
    //     if(!requestFound){
    //         throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
    //     }

    //     try {
    //         this.companyConnectionGroupRepo.merge(requestFound, updateData)
    //         const result = await this.companyConnectionGroupRepo.save(requestFound)
    //         return Promise.resolve({
    //             status: 'success',
    //             result
    //         })
    //     } catch (error) {
    //         this.logger.error(error.message, error.stack)
    //         throw new InternalServerErrorException()
    //     }        
                
    // }
    

    // async delete(params: ValidParamId, user: User): Promise<any>{
    //     const requestFound = await this.companyConnectionGroupRepo.findOne({ 
    //         where: { 
    //             id: params.id,
    //             company: {
    //                 id: params.companyId,
    //                 created_by: user
    //             }
    //         } 
    //     })

    //     if(!requestFound){
    //         throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
    //     }

    //     const result = await this.companyConnectionGroupRepo.delete(params.id)
    //     if(result.affected === 0){
    //         throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
    //     }

    //     return Promise.resolve({
    //         result,
    //         status: 'success'
    //     })
    // }

    private async findCompanyConnectionGroupCategoryById(params: ValidParamId, user: User){
        const requestFound = await this.companyConnectionGroupCategoryRepo.findOne(params.id)
        return requestFound
    }
}

