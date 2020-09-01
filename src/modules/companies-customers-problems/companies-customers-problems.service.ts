import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateCustomerProblemsDto } from './dto/create-company-customer-problem.dto'
import { UpdateCustomerProblemsDto } from './dto/update-company-customer-problem.dto'
import { UserEntity as User } from '../users/user.entity'
import { CustomerEntity as Customer } from '../companies-customers/customer.entity'
import { CustomerProblemsEntity as CustomerProblem } from './customer-problems.entity'

@Injectable()
export class CompaniesCustomersProblemsService {
    constructor (
        @InjectRepository(CustomerProblem) private readonly customerProblemRepo: Repository<CustomerProblem>,
        @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>
    ){}
    private logger = new Logger('CompaniesCustomersProblemsService')
    private entity_prefix_name: string = 'Companies Customers Problems'
    
    async getAll(params: ValidParamId, user: User): Promise<any>{
        const result = await this.customerProblemRepo.find({
            where:{
                customer:{
                    id:params. customerId,                    
                    company: {
                        id: params.companyId,
                        created_by: user
                    }
                }
            },                        
            order: {
                createdAt: 'DESC'
            }
        });
        return { status: 'success', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findCustomerProblemById(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create( params: ValidParamId, user: User, newData: CreateCustomerProblemsDto): Promise<any>{
        const requestFound = await this.customerProblemRepo.findOne({ 
            where: { 
                title: newData.title,
                customer: {
                    id: params.customerId,
                    company:{
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
                const newCustomerProblem = new CustomerProblem()
                newCustomerProblem.title = newData.title
                newCustomerProblem.description = newData.description
                newCustomerProblem.customer = await this.customerRepo.findOne(params.customerId)
                const result = await this.customerProblemRepo.save(newCustomerProblem)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCustomerProblemsDto): Promise<any>{
        
        const requestFound = await this.findCustomerProblemById(params, user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.customerProblemRepo.merge(requestFound, updateData)
            const result = await this.customerProblemRepo.save(requestFound)
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
        const requestFound = await this.findCustomerProblemById(params, user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.customerProblemRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCustomerProblemById(params: ValidParamId, user: User){
        const requestFound = await this.customerProblemRepo.findOne({ 
            where: { 
                id: params.id,
                customer:{
                    id:params. customerId,
                    company_customer_segment: {
                        id: params.customer_segmentId,
                        company: {
                            id: params.companyId,
                            created_by: user
                        }
                    }
                }
            } 
        })
        return requestFound
    }
}
