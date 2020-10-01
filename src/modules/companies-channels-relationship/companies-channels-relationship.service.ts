
import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { UserEntity as User } from '../users/user.entity'
import { CategoryEntity as Category } from '../companies-channels-category/category.entity'
import { CustomerEntity as Customer } from '../companies-customers/customer.entity'
import { RelationshipEntity as Relationship } from './relationship.entity'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { CreateCompanyChannelRelationshipDto } from './dto/create.dto'

@Injectable()
export class CompaniesChannelsRelationshipService {
    constructor (
        @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
        @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,
        @InjectRepository(Relationship) private readonly relationshipRepo: Repository<Relationship>   
    ){}
    private logger = new Logger('CompaniesChannelsRelationshipService')
    private entity_prefix_name: string = 'Company Channels Relationship'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{
        const result = await this.relationshipRepo.find({
            where: {
                category:{
                    id: params.channelCategoryId,
                    channel: {
                        id: params.channelId,
                        company: {
                            id: params.companyId
                        }
                    }
                }
            },            
            order: {
                createdAt: 'DESC'
            }
        });
        return { status: 'success', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const result = await this.relationshipRepo.findOne(params.id)
        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyChannelRelationshipDto): Promise<any>{
        const requestFound = await this.relationshipRepo.findOne({ 
            where: { 
                category:{
                    id: params.channelCategoryId,
                    channel: {
                        id: params.channelId,
                        company: {
                            id: params.companyId
                        }
                    }
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} already exists`)
        }else{   
            try {    
                const newEntry = new Relationship()
                newEntry.category = await this.categoryRepo.findOne(params.channelCategoryId)
                newEntry.customer = await this.customerRepo.findOne(newData.customer_id)                

                const result = await this.relationshipRepo.save(newEntry)                
                
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
        const requestFound = await this.relationshipRepo.findOne({ 
            where: { 
                id: params.id,
                category:{
                    id: params.channelCategoryId,
                    channel: {
                        id: params.channelId,
                        company: {
                            id: params.companyId
                        }
                    }
                }
            } 
        })

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.relationshipRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }
}

