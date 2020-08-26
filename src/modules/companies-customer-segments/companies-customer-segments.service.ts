import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CompanyEntity as Company } from '../companies/company.entity'
import { CompanyCustomerSegmentsEntity as CompanyCustomerSegment } from './company-customer-segments.entity'
import { UserEntity as User } from '../users/user.entity'
import { CreateCompanyCustomerSegmentDto } from './dto/create-comp-customer-segment.dto'
import { CustomerSegmentEntity as CustomerSegment } from '../customer-segments/customer-segment.entity'
import { BulkCompanyCustomerSegmentDto } from './dto/bulk-create-segment.dto';


@Injectable()
export class CompaniesCustomerSegmentsService {
    constructor(
        @InjectRepository(CompanyCustomerSegment) private readonly companyCustomerSegmentRepo: Repository<CompanyCustomerSegment>,
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(CustomerSegment) private readonly customerSegmentRepo: Repository<CustomerSegment>
    ){}

    private logger = new Logger('CompanyCustomerSegmentsService')
    private entity_prefix_name: string = 'Company Customer Segment'
    
    async getAll(params: ValidParamId, user: User): Promise<any>{
        const result = await this.companyCustomerSegmentRepo.find({
            where: {
                company: {
                    id: params.companyId,
                    created_by: user
                }                
            },
            relations: ['customer_segment']
        });
        return { status: 'success', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{

        const requestFound = await this.findOneEntityById(params,user)
        
        if(requestFound){
            return { status: 'success', result: requestFound }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyCustomerSegmentDto): Promise<any>{
        const requestFound = await this.companyCustomerSegmentRepo.findOne({
            where: {
                customer_segment: newData.customer_segment ,
                company: { 
                    id: params.companyId , 
                    created_by: user 
                } 
            }                     
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} already exists`)
        }else{ 
            
            try {   
                const newEntry = new CompanyCustomerSegment()
                newEntry.company = await this.companyRepo.findOne(params.companyId)
                newEntry.customer_segment = await this.customerSegmentRepo.findOne(newData.customer_segment)
                const result = await this.companyCustomerSegmentRepo.save(newEntry)                
                
                return Promise.resolve({
                    status: 'success',
                    result: { id: result.id }
                })
            } catch(error){
                this.logger.error(error.message, error.stack)
                throw new InternalServerErrorException()
            }
        }
        
    }

    // CRETING BULK CUSTOMER SEGMENTS
    async createBulk(params: ValidParamId, user: User, newData: BulkCompanyCustomerSegmentDto): Promise<any>{
        
        /// First delete all the existing entried
        const deleteExisting = await this.companyCustomerSegmentRepo.delete({
            company: { 
                id: params.companyId , 
                created_by: user 
            }
        })

        const company = await this.companyRepo.findOne(params.companyId)
        try {
            
            let savedData = await this.saveCustomerSegments(company, newData.customer_segments)
            return {
                status: 'success',
                result: savedData
            }  
        } catch(error){
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }
        
    }

    private async saveCustomerSegments(company: Company, data: any) {
        // await this.companyCustomerSegmentRepo.delete({company}) //DELETE ALL ENTRIES OF THAT COMPANY
        let result = []
        for (const element of data.entries()) {
            const newEntry = new CompanyCustomerSegment()
            newEntry.company = company
            newEntry.customer_segment = await this.customerSegmentRepo.findOne(element.id)
            const newResult = await this.companyCustomerSegmentRepo.save(newEntry)
            result.push(newResult)
        }   
        return result              
    }

    
    async delete(params : ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findOneEntityById(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.companyCustomerSegmentRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findOneEntityById(params: ValidParamId, user: User){
        const requestFound = await this.companyCustomerSegmentRepo.findOne({
            where: { 
                id: params.id,
                company: { 
                    id: params.companyId ,
                    created_by: user 
                } 
            }                      
        })

        return requestFound
    }
}
