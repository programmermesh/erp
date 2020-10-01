
import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ChannelsEntity as Channel } from '../companies-channels/channels.entity'
import { UserEntity as User } from '../users/user.entity'
import { CategoryEntity as Category } from './category.entity'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { CreateCompanyChannelCategoryDto } from './dto/create.dto'
import { UpdateCompanyChannelCategoryDto } from './dto/update.dto'

@Injectable()
export class CompanyChannelsCategoryService {
    constructor (
        @InjectRepository(Channel) private readonly channelRepo: Repository<Channel>,
        @InjectRepository(Category) private readonly categoryRepo: Repository<Category> 
    ){}
    private logger = new Logger('CompanyChannelsCategoryService')
    private entity_prefix_name: string = 'Company Channels Category'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{
        const result = await this.categoryRepo.find({
            where: {
                channel: {
                    id: params.channelId,
                    company: {
                        id: params.companyId
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
        const result = await this.categoryRepo.findOne(params.id)
        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyChannelCategoryDto): Promise<any>{
        const requestFound = await this.categoryRepo.findOne({ 
            where: { 
                title: newData.name,
                channel:{
                    id: params.channelId
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with title '${newData.name}' already exists`)
        }else{   
            try {    
                const newEntry = new Category()
                const saveThis = {
                    ...newData,
                    channel: await this.channelRepo.findOne(params.channelId)
                }
                this.categoryRepo.merge(newEntry, saveThis)                   

                const result = await this.categoryRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCompanyChannelCategoryDto): Promise<any>{
        
        const requestFound = await this.categoryRepo.findOne(params.id)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        try {
            this.categoryRepo.merge(requestFound, updateData)
            const result = await this.categoryRepo.save(requestFound)
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
        const requestFound = await this.categoryRepo.findOne({ 
            where: { 
                id: params.id,
                channel: {
                    id: params.id,
                    company: {
                        id: params.companyId,
                        // created_by: user
                    }
                }
            } 
        })

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.categoryRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }
}

