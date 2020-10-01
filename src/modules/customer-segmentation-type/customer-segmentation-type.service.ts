import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { CreateCustomerSegmentationTypeDto } from './dto/create-customer-segmentation-type.dto'
import { CustomerSegmentationTypeEntity as CustomerSegmentationType  } from './customer-segmentation-type.entity'

@Injectable()
export class CustomerSegmentationTypeService {
    constructor(
        @InjectRepository(CustomerSegmentationType) private readonly customerSegmentationTypeRepo: Repository<CustomerSegmentationType>
       ){}
    
       private logger = new Logger('CustomerSegmentationTypeService')
       private entity_prefix_name: string = 'Customer Segmentation Type'
       
       async getAll(): Promise<CustomerSegmentationType[]>{
           return await this.customerSegmentationTypeRepo.find({         
               order: {
                   title: 'DESC'
               }
           });
       }
    
       async getById(params: ValidParamId): Promise<any>{
            const requestFound = await this.findCustomerSegmentationTypeById(params)
            if(requestFound){
                return requestFound
            }else{
                throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
            } 
        }
    
        async create(newData: CreateCustomerSegmentationTypeDto): Promise<any>{
            const requestFound = await this.customerSegmentationTypeRepo.findOne({ 
                where: { 
                    title: newData.title
                } 
            })
            if(requestFound){
                throw new NotFoundException(`${this.entity_prefix_name} with that title already exists`)
            }else{   
                try {    
                    const newEntry = new CustomerSegmentationType()
                    newEntry.title = newData.title
                    
                    const result = await this.customerSegmentationTypeRepo.save(newEntry)                
                    
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
    
        async update(params: ValidParamId, updateData: CreateCustomerSegmentationTypeDto): Promise<any>{
            
            const requestFound = await this.findCustomerSegmentationTypeById(params)
            if(!requestFound){
                throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
            }
    
            try {               
                this.customerSegmentationTypeRepo.merge(requestFound, updateData)
                const result = await this.customerSegmentationTypeRepo.save(requestFound)
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
            const requestFound = await this.findCustomerSegmentationTypeById(params)
    
            if(!requestFound){
                throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
            }
    
            const result = await this.customerSegmentationTypeRepo.delete(params.id)
            if(result.affected === 0){
                throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
            }
    
            return Promise.resolve({
                result,
                status: 'success'
            })
        }
    
        private async findCustomerSegmentationTypeById(params: ValidParamId){
            const requestFound = await this.customerSegmentationTypeRepo.findOne({ 
                where: {
                    id: params.id 
                } 
            })
            return requestFound
        }
}
