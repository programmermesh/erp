import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto'
import { CreateRelationDto } from './dto/create-relation.dto'
import { RelationEntity as Relation } from './relation.entity'

@Injectable()
export class RelationsService {
    constructor (
        @InjectRepository(Relation) private readonly relationRepo: Repository<Relation>
    ){}
    private logger = new Logger('RelationsService')
    private entity_prefix_name: string = 'Relation'
    
    async getAll(): Promise<Relation[]>{
        return await this.relationRepo.find({                        
            order: {
                title: 'DESC'
            }
        });
    }

    async getById(params: ValidParamId): Promise<any>{
        const requestFound = await this.findRelationById(params)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create( newData: CreateRelationDto): Promise<any>{
        const requestFound = await this.relationRepo.findOne({ 
            where: { 
                title: newData.title
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with the title '${newData.title}' already exists`)
        }else{   
            try {
                const newRelation = new Relation()
                this.relationRepo.merge(newRelation, newData)
                const result = await this.relationRepo.save(newRelation)                
                
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

    async update(params: ValidParamId, updateData: CreateRelationDto): Promise<any>{
        
        const requestFound = await this.findRelationById(params)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.relationRepo.merge(requestFound, updateData)
            const result = await this.relationRepo.save(requestFound)
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
        const requestFound = await this.findRelationById(params)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.relationRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findRelationById(params: ValidParamId){
        const requestFound = await this.relationRepo.findOne({ 
            where: { 
                id: params.id
            } 
        })
        return requestFound
    }
}
