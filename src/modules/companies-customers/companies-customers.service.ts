import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CustomerEntity as Customer } from './customer.entity'
import { UserEntity as User } from '../users/user.entity'
import { CompanyEntity as Company } from '../companies/company.entity'
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
        @InjectRepository(CompanyCustomerSegment) private readonly companyCustomerSegmentRepo: Repository<CompanyCustomerSegment>,
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>
    ){}
    private logger = new Logger('CompaniesCustomersService')
    private entity_prefix_name: string = 'Company customer'
    
    async getAll(params: ValidParamId, user: User): Promise<any>{
        const result = await this.customerRepo.createQueryBuilder('customers')
            .leftJoin('customers.company', 'company')
            .leftJoinAndSelect('customers.customer_problems','problems')
            .leftJoinAndSelect('problems.solutions','solutions')
            .leftJoinAndSelect('customers.customer_segmentations','customer_segmentations')
            .leftJoinAndSelect('customer_segmentations.segmentation','segmentation')
            .where('company.id = :id', { id: params.companyId })
            .orderBy('customers.createdAt', 'DESC')
            .getMany()
        
        return { status: 'success', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        //const requestFound = await this.findCustomerById(params, user)

        const result = await this.customerRepo.createQueryBuilder('customers')
            .leftJoin('customers.company', 'company')
            .leftJoinAndSelect('customers.customer_problems','problems')
            .leftJoinAndSelect('customers.customer_segmentations','customer_segmentations')
            .leftJoinAndSelect('customer_segmentations.segmentation','segmentation')
            .where('company.id = :id', { id: params.companyId })
            .andWhere('customers.id = :customerId', { customerId: params.id  })
            .getOne()

        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyCustomerDto): Promise<any>{
        const requestFound = await this.customerRepo.findOne({ 
            where: { 
                name: newData.name,
                segment: newData.segment,
                company: {
                    id: params.companyId,
                    created_by: user
                }
            } 
        })
        
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with the name '${newData.name}' already exists`)
        }else{   
            try {
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                
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
            
            this.customerRepo.merge(requestFound, updateData)
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
            company: {
                id: params.companyId,
                created_by: user
            }
             
        })
        return requestFound
    }
}
