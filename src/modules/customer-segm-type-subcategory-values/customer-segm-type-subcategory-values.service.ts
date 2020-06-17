import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { v4 as uuid } from 'uuid';

import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { CreateCustSegTypesSubcategoriesValueDto } from './dto/create-cust-segm-type-subcategory-value.dto'
import { UpdateCustSegTypesSubcategoriesValueDto } from './dto/update-cust-segm-type-subcategory-value.dto'
import { CustSegTypesSubcategoriesValueEntity as CustSegTypesSubcategoriesValue } from './cust-seg-types-subcategories-value.entity'
import { CompanyCustomerSegmentDetailsEntity as CompanyCustomerSegmentDetails } from '../companies-customer-segment-details/company-customer-segment-details.entity'
import { CustomerSegTypeSubcategoryEntity as CustomerSegTypeSubcategory } from '../customer-segm-type-subcategory/customer-seg-type-subcategory.entity'

@Injectable()
export class CustomerSegmTypeSubcategoryValuesService {
    constructor(
        @InjectRepository(CustSegTypesSubcategoriesValue) private readonly custSegTypesSubcategoriesValueRepo: Repository<CustSegTypesSubcategoriesValue>,
        @InjectRepository(CompanyCustomerSegmentDetails) private readonly companyCustomerSegmentDetailsRepo: Repository<CompanyCustomerSegmentDetails>,
        @InjectRepository(CustomerSegTypeSubcategory) private readonly customerSegTypeSubcategoryRepo: Repository<CustomerSegTypeSubcategory>
    ){}

    private logger = new Logger('CustomerSegmTypeSubcategoryValuesService')
    private entity_prefix_name: string = 'Company customer segment details (segmentation type)'
    
    async getAll( params: ValidParamId, user: User ): Promise<CustSegTypesSubcategoriesValue[]>{
        return await this.custSegTypesSubcategoriesValueRepo.find({
            where: {
                company_customer_segment_details: {
                    id: params.segmentationId,
                    company_customer_segments: {
                        id: params.company_customer_segmentId,
                        company: params.companyId
                    }
                }          
            },            
            order: {
                value: 'DESC'
            },
            relations: ['cust_seg_types_subcategories']
        });
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findCompanyCustomerSegmentDetailsValueById(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCustSegTypesSubcategoriesValueDto): Promise<any>{
        const requestFound = await this.custSegTypesSubcategoriesValueRepo.findOne({ 
            where: { 
                value: newData.value,
                company_customer_segment_details: {
                    id: params.segmentationId,
                    company_customer_segments: {
                        id: params.company_customer_segmentId,
                        company: params.companyId
                    }
                },
                cust_seg_types_subcategories: newData.cust_seg_types_subcategoriesId
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with title "${newData.value}" already exists`)
        }else{   
            try {    
                const newEntry = new CustSegTypesSubcategoriesValue()
                newEntry.value = newData.value
                newEntry.cust_seg_types_subcategories = await this.customerSegTypeSubcategoryRepo.findOne(newData.cust_seg_types_subcategoriesId)
                newEntry.company_customer_segment_details = await this.companyCustomerSegmentDetailsRepo.findOne(params.segmentationId)
                
                const result = await this.custSegTypesSubcategoriesValueRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCustSegTypesSubcategoriesValueDto): Promise<any>{
        
        const requestFound = await this.findCompanyCustomerSegmentDetailsValueById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.custSegTypesSubcategoriesValueRepo.merge(requestFound, updateData)
            const result = await this.custSegTypesSubcategoriesValueRepo.save(requestFound)
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
        const requestFound = await this.findCompanyCustomerSegmentDetailsValueById(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.custSegTypesSubcategoriesValueRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCompanyCustomerSegmentDetailsValueById(params: ValidParamId, user: User){
        const requestFound = await this.custSegTypesSubcategoriesValueRepo.findOne({ 
            where: {
                id: params.id,
                company_customer_segment_details: {
                    id: params.segmentationId,
                    company_customer_segments: {
                        id: params.company_customer_segmentId,
                        company: params.companyId
                    }
                }
            } 
        })
        return requestFound
    }
}
