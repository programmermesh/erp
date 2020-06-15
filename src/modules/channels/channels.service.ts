import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateChannelDto } from './dto/create-channel.dto'
import { UpdateChannelDto } from './dto/update-channel.dto'
import { ChannelEntity as Channel } from './channel.entity'
import { RelationEntity as Relation } from '../relations/relation.entity'

@Injectable()
export class ChannelsService {
    constructor (
        @InjectRepository(Channel) private readonly channelRepo: Repository<Channel>,
        @InjectRepository(Relation) private readonly relationRepo: Repository<Relation>
    ){}
    private logger = new Logger('ChannelsService')
    private entity_prefix_name: string = 'Channels'
    
    async getAll(params: ValidParamId): Promise<Channel[]>{
        return await this.channelRepo.find({
            where: {
                relations: params.relationId
            },                        
            order: {
                name: 'DESC'
            }
        });
    }

    async getById(params: ValidParamId): Promise<any>{
        const requestFound = await this.findchannelById(params)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, newData: CreateChannelDto): Promise<any>{
        const requestFound = await this.channelRepo.findOne({ 
            where: { 
                name: newData.name,
                relations: {
                    id: params.relationId
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with the title '${newData.name}' already exists`)
        }else{   
            try {
                const newChannel = new Channel()
                newChannel.name = newData.name
                newChannel.relations = await this.relationRepo.findOne(params.relationId)
                
                const result = await this.channelRepo.save(newChannel)                
                
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

    async update(params: ValidParamId, updateData: UpdateChannelDto): Promise<any>{
        
        const requestFound = await this.findchannelById(params)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
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
    

    async delete(params: ValidParamId): Promise<any>{
        const requestFound = await this.findchannelById(params)

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

    private async findchannelById(params: ValidParamId){
        const requestFound = await this.channelRepo.findOne({ 
            where: { 
                id: params.id,
                relations: params.relationId
            } 
        })
        return requestFound
    }
}
