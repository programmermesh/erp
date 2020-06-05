import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import {BusinessSectorsEntity as BusinessSector } from './business-sectors.entity'
import { CreateBusinessSectorDto } from './dto/create-business-sector.dto'
import { UpdateBusinessSectorDto } from './dto/update-business-sector.dto'

@Injectable()
export class BusinessSectorsService {
    constructor (@InjectRepository(BusinessSector) private readonly businessSectorRepo: Repository<BusinessSector> ){}
    private logger = new Logger('BusinessSectorsService')
    private entity_prefix_name: string = 'Business Sector'
    
    async getAll(): Promise<BusinessSector[]>{
        return await this.businessSectorRepo.find({            
            order: {
                name: 'DESC'
            }
        });
    }

    async getById(id: string): Promise<any>{
        const requestFound = await this.businessSectorRepo.findOne({ 
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

    async create(newData: CreateBusinessSectorDto): Promise<any>{
        const requestFound = await this.businessSectorRepo.findOne({ 
            where: { 
                name: newData.name
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.name}' already exists`)
        }else{   
            try {    
                const newEntry = new BusinessSector()
                this.businessSectorRepo.merge(newEntry, newData)
                const result = await this.businessSectorRepo.save(newEntry)                
                
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

    async update(id: string, updateData: UpdateBusinessSectorDto): Promise<any>{
        
        const requestFound = await this.businessSectorRepo.findOne({ 
            where: { 
                id
            } 
        })
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' by current user cannot be found `)
        }

        try {
            this.businessSectorRepo.merge(requestFound, updateData)
            const result = await this.businessSectorRepo.save(requestFound)
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
        const requestFound = await this.businessSectorRepo.findOne({ 
            where: { 
                id
            } 
        })

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' cannot be found `)
        }

        const result = await this.businessSectorRepo.delete(id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }
}
