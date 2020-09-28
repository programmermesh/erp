import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { BusinessStagesEntity as BusinessStage } from './business-stages.entity'
import { CreateBusinessStageDto } from './dto/create-business-stage.dto'
import { UpdateBusinessStageDto } from './dto/update-business-stage.dto'

@Injectable()
export class BusinessStagesService {
    constructor (@InjectRepository(BusinessStage) private readonly businessStageRepo: Repository<BusinessStage> ){}
    private logger = new Logger('BusinessStagesService')
    private entity_prefix_name: string = 'Business Sector'
    
    async getAll(): Promise<BusinessStage[]>{
        return await this.businessStageRepo.find({            
            order: {
                name: 'ASC'
            }
        });
    }

    async getById(id: string): Promise<any>{
        const requestFound = await this.businessStageRepo.findOne({ 
            where: { 
                id
            } 
        })
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' not found`)
        } 
    }

    async create(newData: CreateBusinessStageDto): Promise<any>{
        const requestFound = await this.businessStageRepo.findOne({ 
            where: { 
                name: newData.name
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.name}' already exists`)
        }else{   
            try {    
                const newEntry = new BusinessStage()
                this.businessStageRepo.merge(newEntry, newData)
                const result = await this.businessStageRepo.save(newEntry)                
                
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

    async update(id: string, updateData: UpdateBusinessStageDto): Promise<any>{
        
        const requestFound = await this.businessStageRepo.findOne({ 
            where: { 
                id
            } 
        })
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' by current user cannot be found `)
        }

        try {
            this.businessStageRepo.merge(requestFound, updateData)
            const result = await this.businessStageRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }

    async delete(id: string): Promise<any>{
        const requestFound = await this.businessStageRepo.findOne({ 
            where: { 
                id
            } 
        })

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' cannot be found `)
        }

        const result = await this.businessStageRepo.delete(id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }
}
