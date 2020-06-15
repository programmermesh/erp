import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CustomerEntity as Customer } from './customer.entity'
import { UserEntity as User } from '../users/user.entity'
import { CompanyCustomerSegmentsEntity as CompanyCustomerSegment } from '../companies-customer-segments/company-customer-segments.entity'
import { IncomeBracketEntity as IncomeBracket } from '../income-brackets/income-bracket.entity'
import { EducationStagesEntity as EducationStage } from '../education-stages/education-stages.entity'
import { CreateCompanyCustomerDto } from './dto/create-company-customer.dto'
import { UpdateCompanyCustomerDto } from './dto/update-company-customer.dto'

@Injectable()
export class CompaniesCustomersService {
    constructor (
        @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,
        @InjectRepository(IncomeBracket) private readonly incomeBracketRepo: Repository<IncomeBracket>,
        @InjectRepository(EducationStage) private readonly educationStageRepo: Repository<EducationStage>,
        @InjectRepository(CompanyCustomerSegment) private readonly companyCustomerSegmentRepo: Repository<CompanyCustomerSegment>
    ){}
    private logger = new Logger('CompaniesCustomersService')
    private entity_prefix_name: string = 'Company customer'
    
    async getAll(params: ValidParamId, user: User): Promise<Customer[]>{
        return await this.customerRepo.find({
            company_customer_segment: {
                id: params.customer_segmentId,
                company: {
                    id: params.companyId,
                    created_by: user
                }
            }
        });
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findCustomerById(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyCustomerDto): Promise<any>{
        const requestFound = await this.customerRepo.findOne({ 
            where: { 
                title: newData.title,
                company_customer_segment: {
                    id: params.customer_segmentId,
                    company: {
                        id: params.companyId,
                        created_by: user
                    }
                }
            } 
        })
        
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with the title '${newData.title}' already exists`)
        }else{   
            try {
                const {
                    income_bracketId,
                    education_stageId,
                    ...saveThis
                } = newData
                saveThis['education_stage'] =  education_stageId ? await this.educationStageRepo.findOne(education_stageId) : null
                saveThis['income_bracket'] = income_bracketId ? await this.incomeBracketRepo.findOne(income_bracketId) : null              
                saveThis['company_customer_segment'] = await this.companyCustomerSegmentRepo.findOne(params.customer_segmentId)
                
                const result = await this.customerRepo.save(saveThis)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCompanyCustomerDto): Promise<any>{
        
        const requestFound = await this.findCustomerById(params, user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            const {
                income_bracketId,
                education_stageId,
                ...updateThis
            } = updateData
            updateThis['education_stage'] =  education_stageId ? await this.educationStageRepo.findOne(education_stageId) : requestFound.education_stage
            updateThis['income_bracket'] = income_bracketId ? await this.incomeBracketRepo.findOne(income_bracketId) : requestFound.income_bracket 
            this.customerRepo.merge(requestFound, updateThis)
            const result = await this.customerRepo.save(requestFound)
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

        const result = await this.customerRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCustomerById(params: ValidParamId, user: User){
        const requestFound = await this.customerRepo.findOne({ 
            id: params.id,
            company_customer_segment: {
                id: params.customer_segmentId,
                company: {
                    id: params.companyId,
                    created_by: user
                }
            } 
        })
        return requestFound
    }
}
