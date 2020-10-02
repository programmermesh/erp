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
        let result =  await this.customerSegmentRepo.find({            
            order: {
                name: 'ASC'
            }
        })
        const defaultData = [
            {
                "initials": "B2B",
                "name": "Business to Business",
                "color_code": "#008080"
            },
            {
                "initials": "B2C",
                "name": "Business to Consumer",
                "color_code": "#F90B98"
            },
            {
                "initials": "B2G",
                "name": "Business to Government",
                "color_code": "#70F90B",
            },
            {
                "initials": "C2C",
                "name": "Consumer to Consumer",
                "color_code": "#d3d3d3"
            },
            {
                "initials": "G2B",
                "name": "Government to Business",
                "color_code": "#76d453",
            },
            {
                "initials": "G2C",
                "name": "Government to Consumer",
                "color_code": "#d3d453",
            }
        ]
        if(result && result.length){
            //we have results
            return result
        } else {
            // we have nothing in the table
            for (let index = 0; index < defaultData.length; index++) {
                const newEntry = new CustomerSegment()
                newEntry.name = defaultData[index].name
                newEntry.initials = defaultData[index].initials
                newEntry.color_code = defaultData[index].color_code
                await this.customerSegmentRepo.save(newEntry)
            }
            result = await this.customerSegmentRepo.find({            
                order: {
                    name: 'ASC'
                }
            })

            return result
        }
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
