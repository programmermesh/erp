import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { CreateCompanyCustomerSegmentDetailsDetailsDto } from './dto/create-company-customer-segment-details.dto'
import { UpdateCompanyCustomerSegmentDetailsDetailsDto } from './dto/update-company-customer-segment-details.dto'
import { CompanyCustomerSegmentsEntity as CompanyCustomerSegments } from '../companies-customer-segments/company-customer-segments.entity'
import { CompanyCustomerSegmentDetailsEntity as CompanyCustomerSegmentDetails } from './company-customer-segment-details.entity'

@Injectable()
export class CompaniesCustomerSegmentDetailsService {
    constructor(
        @InjectRepository(CompanyCustomerSegments) private readonly companyCustomerSegmentsRepo: Repository<CompanyCustomerSegments>,
        @InjectRepository(CompanyCustomerSegmentDetails) private readonly companyCustomerSegmentDetailsRepo: Repository<CompanyCustomerSegmentDetails>
    ){}

    private logger = new Logger('CompaniesCustomerSegmentDetailsService')
    private entity_prefix_name: string = 'Company customer segment details'
    
    async getAll( params: ValidParamId, user: User ): Promise<CompanyCustomerSegmentDetails[]>{
        return await this.companyCustomerSegmentDetailsRepo.find({
            where: {
                company_customer_segments:{
                    id: params.company_customer_segmentId,
                    company: params.companyId
                }             
            },            
            order: {
                title: 'DESC'
            }
        });
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findCompanyCustomerSegmentDetailsById(params, user, true)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyCustomerSegmentDetailsDetailsDto): Promise<any>{
        const requestFound = await this.companyCustomerSegmentDetailsRepo.findOne({ 
            where: { 
                title: newData.title,
                company_customer_segments: {
                    id: params.company_customer_segmentId
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with title "${newData.title}" already exists`)
        }else{   
            try {    
                const newEntry = new CompanyCustomerSegmentDetails()
                newEntry.title = newData.title
                newEntry.general_details = newData.general_details? newData.general_details : null
                newEntry.color_code = newData.color_code? newData.color_code : null
                newEntry.company_customer_segments = await this.companyCustomerSegmentsRepo.findOne(params.company_customer_segmentId)
                
                const result = await this.companyCustomerSegmentDetailsRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCompanyCustomerSegmentDetailsDetailsDto): Promise<any>{
        
        const requestFound = await this.findCompanyCustomerSegmentDetailsById(params,user,false)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.companyCustomerSegmentDetailsRepo.merge(requestFound, updateData)
            const result = await this.companyCustomerSegmentDetailsRepo.save(requestFound)
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
        const requestFound = await this.findCompanyCustomerSegmentDetailsById(params,user,false)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.companyCustomerSegmentDetailsRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCompanyCustomerSegmentDetailsById(params: ValidParamId, user: User, refineResult){
        const requestFound = await this.companyCustomerSegmentDetailsRepo.findOne({ 
            where: {
                id: params.id,
                company_customer_segments: {
                    id: params.company_customer_segmentId,
                    company: params.companyId
                }
            },
            relations: [
                'segment_details_in_subcategory_values', 
                'segment_details_in_subcategory_values.cust_seg_types_subcategories',
                'segment_details_in_subcategory_values.cust_seg_types_subcategories.customer_segmentation_types',
            ] 
        })

        if(refineResult && requestFound.segment_details_in_subcategory_values.length > 0){
            //we will re-arrange the result to have the segmentation type and subcategories
            const objectProperties = requestFound.segment_details_in_subcategory_values
            const obj = {}
            const reducer = (acc, obj) => {
                let newObject = {}
                let key = obj.cust_seg_types_subcategories.customer_segmentation_types.title
                newObject[obj.cust_seg_types_subcategories.title] = obj.value

                if (!acc[key]) {
                    acc[key] = []
                }
                acc[key].push(newObject)
                return acc
            }
            const data = await objectProperties.reduce(reducer, obj)
            requestFound['segmentation_data'] = data
            
            return requestFound
        }else{
            return requestFound
        }

        
    }
    
}
