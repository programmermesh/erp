
import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { ChannelsEntity as Channel } from './channels.entity'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { CreateCompanyChannelDto } from './dto/create.dto'
import { UpdateCompanyChannelDto } from './dto/update.dto'

@Injectable()
export class CompanyChannelsService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(Channel) private readonly channelRepo: Repository<Channel> 
    ){}
    private logger = new Logger('CompanyChannelsService')
    private entity_prefix_name: string = 'Company Channels'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{
        const result = await this.channelRepo.createQueryBuilder('companies_channels')
            .leftJoinAndSelect('companies_channels.categories', 'categories')
            .leftJoinAndSelect('categories.relationships','relationships')
            //.leftJoinAndSelect('relationships.customer','customer')
            .leftJoin('companies_channels.company','company')
            .where('company.id = :id', { id: params.companyId })
            //.andWhere('companies_channels.id = :channelId', { channelId: params.channelId })
            .orderBy('companies_channels.createdAt', 'DESC')
            .getMany()
        return { status: 'success', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const result = await this.channelRepo.findOne(params.id)
        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyChannelDto): Promise<any>{
        const requestFound = await this.channelRepo.findOne({ 
            where: { 
                title: newData.title,
                phase: newData.phase,
                company:{
                    id: params.companyId
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with title '${newData.title}' already exists`)
        }else{   
            try {    
                const newEntry = new Channel()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.channelRepo.merge(newEntry, saveThis)                   

                const result = await this.channelRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCompanyChannelDto): Promise<any>{
        
        const requestFound = await this.channelRepo.findOne(params.id)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        try {
            this.channelRepo.merge(requestFound, updateData)
            const result = await this.channelRepo.save(requestFound)
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
        const requestFound = await this.channelRepo.findOne({ 
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

        const result = await this.channelRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }
}

