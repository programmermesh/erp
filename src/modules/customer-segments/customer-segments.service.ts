import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CustomerSegmentEntity as CustomerSegment } from './customer-segment.entity'
import { CreateCustomerSegmentDto } from './dto/create-customer-segment.dto'
import { UpdateCustomerSegmentDto } from './dto/update-customer-segment.dto'

@Injectable()
export class CustomerSegmentsService {
    constructor (@InjectRepository(CustomerSegment) private readonly customerSegmentRepo: Repository<CustomerSegment> ){}
    private logger = new Logger('CustomerSegmentsService')
    private entity_prefix_name: string = 'Customer segment'
    
    async getAll(): Promise<CustomerSegment[]>{
        return await this.customerSegmentRepo.find({            
            order: {
                name: 'ASC'
            }
        });
    }

    async getById(id: string): Promise<any>{
        const requestFound = await this.customerSegmentRepo.findOne({ 
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

    async create(newData: CreateCustomerSegmentDto): Promise<any>{
        const requestFound = await this.customerSegmentRepo.findOne({ 
            where: { 
                name: newData.initials
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.initials}' already already`)
        }else{   
            try {    
                const newEntry = new CustomerSegment()
                this.customerSegmentRepo.merge(newEntry, newData)
                const result = await this.customerSegmentRepo.save(newEntry)                
                
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

    async update(id: string, updateData: UpdateCustomerSegmentDto): Promise<any>{
        
        const requestFound = await this.customerSegmentRepo.findOne({ 
            where: { 
                id
            } 
        })
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' by current user cannot be found `)
        }

        try {
            this.customerSegmentRepo.merge(requestFound, updateData)
            const result = await this.customerSegmentRepo.save(requestFound)
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
        const requestFound = await this.customerSegmentRepo.findOne({ 
            where: { 
                id
            } 
        })

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' cannot be found `)
        }

        const result = await this.customerSegmentRepo.delete(id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }
}
