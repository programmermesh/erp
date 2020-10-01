import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ValidParamId } from '../../../common/valid-param-id.dto'
import { CreateChannelDetailDto } from './dto/create-channel-details.dto'
import { UpdateChannelDetailDto } from './dto/update-channel-details.dto'
import { ChannelDetailEntity as ChannelDetail} from './channel-detail.entity'
import { ChannelEntity as Channel } from '../channel.entity'

@Injectable()
export class DetailsService {
    constructor (
        @InjectRepository(ChannelDetail) private readonly channelDetailRepo: Repository<ChannelDetail>,
        @InjectRepository(Channel) private readonly channelRepo: Repository<Channel>
    ){}
    private logger = new Logger('DetailsService')
    private entity_prefix_name: string = 'Channel Detail'
    
    async getAll(params: ValidParamId): Promise<ChannelDetail[]>{
        return await this.channelDetailRepo.find({ 
            where: {
                channels:{
                    id: params.channelId,
                    relations: params.relationId
                }
            },                     
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async getById(params: ValidParamId): Promise<any>{
        const requestFound = await this.findChannelDetailById(params)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, newData: CreateChannelDetailDto): Promise<any>{
        const requestFound = await this.channelDetailRepo.findOne({ 
            where: { 
                details: newData.details,
                channels: params.channelId
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with the title '${newData.details}' already exists`)
        }else{   
            try {
                const newChannelDetail = new ChannelDetail()
                newChannelDetail.channels = await this.channelRepo.findOne(params.channelId)
                newChannelDetail.details = newData.details
                const result = await this.channelDetailRepo.save(newChannelDetail)                
                
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

    async update(params: ValidParamId, updateData: UpdateChannelDetailDto): Promise<any>{
        
        const requestFound = await this.findChannelDetailById(params)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.channelDetailRepo.merge(requestFound, updateData)
            const result = await this.channelDetailRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }
    

    async delete(params: ValidParamId): Promise<any>{
        const requestFound = await this.findChannelDetailById(params)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.channelDetailRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findChannelDetailById(params: ValidParamId){
        const requestFound = await this.channelDetailRepo.findOne({ 
            where: { 
                id: params.id
            } 
        })
        return requestFound
    }
}
