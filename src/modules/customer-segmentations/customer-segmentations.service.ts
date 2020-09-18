
import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CustomerSegmentationsEntity as CustomerSegmentations } from './customer-segmentations.entity'
import { SegmentationsEntity as Segmentations } from '../segmentations/segmentations.entity'
import { CustomerEntity as Customer } from '../companies-customers/customer.entity'
import { UserEntity as User } from '../users/user.entity'
import { CreateCustomerSegmentationDto } from './dto/createDto'
import { UpdateCustomerSegmentationDto } from './dto/updateDto'

@Injectable()
export class CustomerSegmentationsService {
    constructor (
        @InjectRepository(CustomerSegmentations) private readonly customerSegmentationsRepo: Repository<CustomerSegmentations>,
        @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,
        @InjectRepository(Segmentations) private readonly segmentationsRepo: Repository<Segmentations>
    ){}
    private logger = new Logger('CustomerSegmentationsService')
    private entity_prefix_name: string = 'Customer Segmentation'
    
    async getAll(params: ValidParamId, user: User): Promise<any>{
        const result = await this.customerSegmentationsRepo.createQueryBuilder('customer_segmentation')
            .leftJoinAndSelect('customer_segmentation.customer', 'customer')
            .leftJoin('customer.company','company')
            .leftJoinAndSelect('customer_segmentation.segmentation', 'segmentation')
            .where('company.id = :id', { id: params.companyId })
            //.andWhere('customer_segmentation.id = :customerSegmentationId', { customerSegmentationId: params.id  })
            .getMany()
        
        return { status: 'success', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        //const requestFound = await this.findCustomerById(params, user)        
        const result = await this.customerSegmentationsRepo.createQueryBuilder('customer_segmentation')
            .leftJoin('customer_segmentation.customer', 'customer')
            .leftJoinAndSelect('customer.company','company')
            .leftJoinAndSelect('customer_segmentation.segmentation', 'segmentation')
            .where('company.id = :id', { id: params.companyId })
            //.andWhere('customer.id = :customerId', { customerId: params.customerId  })
            .andWhere('customer_segmentation.id = :customerSegmentationId', { customerSegmentationId: params.id  })
            .getOne()

        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCustomerSegmentationDto): Promise<any>{
        //delete any previous data under the segmentation id
        if(newData.delete_previous_entries){
            //mainly delete entried to demographic segment
            
            await this.customerSegmentationsRepo.createQueryBuilder('customer_segmentation')
                .delete()
                .where('segmentation = :segmentationId', { segmentationId: newData.segmentationId })
                .andWhere('customer = :customerId', { customerId: params.customerId })
                .execute()
        } 
        const requestFound = await this.customerSegmentationsRepo.findOne({ 
            where: { 
                segment_value: newData.segment_value,
                segmentation: newData.segmentationId,
                customer: {
                    id: params.customerId,
                    company: {
                        id: params.companyId,
                        //created_by: user
                    }
                }
                
            } 
        })
        
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with the value '${newData.segment_value}' already exists`)
        }else{   
            try {
               

                const saveThis = {
                    segment_value: newData.segment_value,
                    group_index: newData.group_index,
                    segmentation: await this.segmentationsRepo.findOne(newData.segmentationId),
                    customer: await this.customerRepo.findOne(params.customerId)
                }
                
                const result = await this.customerSegmentationsRepo.save(saveThis)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCustomerSegmentationDto): Promise<any>{
        
        const requestFound = await this.findCustomerById(params, user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            
            this.customerSegmentationsRepo.merge(requestFound, updateData)
            const result = await this.customerSegmentationsRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }
    

    async delete(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findCustomerById(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.customerSegmentationsRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCustomerById(params: ValidParamId, user: User){
        const requestFound = await this.customerSegmentationsRepo.findOne({ 
            id: params.id,
            customer:{
                id: params.customerId,
                company: {
                    id: params.companyId
                }
            }   
             
        })
        return requestFound
    }
}
