import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { CreateCustomerSegTypeSubcategoryDto } from './dto/create-customer-segm-type-subcategory.dto'
import { UpdateCustomerSegTypeSubcategoryDto } from './dto/update-customer-segm-type-subcategory.dto'
import { CustomerSegTypeSubcategoryEntity as CustomerSegTypeSubcategory } from './customer-seg-type-subcategory.entity'
import { CustomerSegmentationTypeEntity as CustomerSegmentationType } from '../customer-segmentation-type/customer-segmentation-type.entity'

@Injectable()
export class CustomerSegmTypeSubcategoryService {
    constructor(
        @InjectRepository(CustomerSegTypeSubcategory) private readonly customerSegTypeSubcategoryRepo: Repository<CustomerSegTypeSubcategory>,
        @InjectRepository(CustomerSegmentationType) private readonly customerSegmentationTypeRepo: Repository<CustomerSegmentationType>
       ){}
    
       private logger = new Logger('CustomerSegmTypeSubcategoryService')
       private entity_prefix_name: string = 'Customer Segmentation Type Subcategory'
       
       async getAll(params: ValidParamId): Promise<CustomerSegTypeSubcategory[]>{
           return await this.customerSegTypeSubcategoryRepo.find({
               where: {
                   customer_segmentation_types:params.customer_segmentation_typeId
               },            
               order: {
                   title: 'DESC'
               },
               relations: ['customer_segmentation_types']
           });
       }
    
       async getById(params: ValidParamId): Promise<CustomerSegTypeSubcategory>{
            const requestFound = await this.findCustomerSegmentationTypeSubcategoryById(params)
            if(requestFound){
                return requestFound
            }else{
                throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
            } 
        }
    
        async create(params: ValidParamId, newData: CreateCustomerSegTypeSubcategoryDto): Promise<any>{
            const requestFound = await this.customerSegTypeSubcategoryRepo.findOne({ 
                where: { 
                    customer_segmentation_types: params.customer_segmentation_typeId,
                    title: newData.title
                } 
            })
            if(requestFound){
                throw new NotFoundException(`${this.entity_prefix_name} already exists`)
            }else{   
                try {    
                    const newEntry = new CustomerSegTypeSubcategory()
                    newEntry.title = newData.title
                    newEntry.customer_segmentation_types = await this.customerSegmentationTypeRepo.findOne(params.customer_segmentation_typeId)
                    
                    const result = await this.customerSegTypeSubcategoryRepo.save(newEntry)                
                    
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
    
        async update(params: ValidParamId,  updateData: UpdateCustomerSegTypeSubcategoryDto): Promise<any>{
            
            const requestFound = await this.findCustomerSegmentationTypeSubcategoryById(params)
            if(!requestFound){
                throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
            }
    
            try {
                this.customerSegTypeSubcategoryRepo.merge(requestFound, updateData)
                const result = await this.customerSegTypeSubcategoryRepo.save(requestFound)
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
            const requestFound = await this.findCustomerSegmentationTypeSubcategoryById(params)
    
            if(!requestFound){
                throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
            }
    
            const result = await this.customerSegTypeSubcategoryRepo.delete(params.id)
            if(result.affected === 0){
                throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
            }
    
            return Promise.resolve({
                result,
                status: 'success'
            })
        }
    
        private async findCustomerSegmentationTypeSubcategoryById(params: ValidParamId){
            const requestFound = await this.customerSegTypeSubcategoryRepo.findOne({ 
                where: {
                    id: params.id,
                    customer_segmentation_types: params.customer_segmentation_typeId  
                } 
            })
            return requestFound
        }
}
