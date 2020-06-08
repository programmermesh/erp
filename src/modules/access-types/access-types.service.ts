import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CreateAccessTypeDto } from './dto/create-access-type.dto'
import { UpdateAccessTypeDto } from './dto/update-access-type.dto'
import { AccessTypesEntity as AccessType } from './access-types.entity'

@Injectable()
export class AccessTypesService {
    constructor (@InjectRepository(AccessType) private readonly accessTypesRepo: Repository<AccessType> ){}
    private logger = new Logger('AccessTypesService')
    private entity_prefix_name: string = 'Access Type'
    
    async getAll(): Promise<AccessType[]>{
        return await this.accessTypesRepo.find({            
            order: {
                name: 'DESC'
            }
        });
    }

    async getById(id: string): Promise<any>{
        const requestFound = await this.accessTypesRepo.findOne({ 
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

    async create(newData: CreateAccessTypeDto): Promise<any>{
        const requestFound = await this.accessTypesRepo.findOne({ 
            where: { 
                name: newData.name
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.name}' already exists`)
        }else{   
            try {    
                const newEntry = new AccessType()
                this.accessTypesRepo.merge(newEntry, newData)
                const result = await this.accessTypesRepo.save(newEntry)                
                
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

    async update(id: string, updateData: UpdateAccessTypeDto): Promise<any>{
        
        const requestFound = await this.accessTypesRepo.findOne({ 
            where: { 
                id
            } 
        })
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' by current user cannot be found `)
        }

        try {
            this.accessTypesRepo.merge(requestFound, updateData)
            const result = await this.accessTypesRepo.save(requestFound)
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
        const requestFound = await this.accessTypesRepo.findOne({ 
            where: { 
                id
            } 
        })

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' cannot be found `)
        }

        const result = await this.accessTypesRepo.delete(id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }
}
