import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateCustomerProblemsSolutionsDto } from './dto/create-customer-problem-solution.dto'
import { UpdateCustomerProblemsSolutionsDto } from './dto/update-customer-problem-solution.dto'
import { CustomerProblemsSolutionsEntity as CustomerProblemsSolution } from './customer-problems-solutions.entity'
import { CustomerProblemsEntity as CustomerProblem } from '../companies-customers-problems/customer-problems.entity'
import { UserEntity as User } from '../users/user.entity'

@Injectable()
export class CompaniesCustomersProblemsSolutionsService {
    constructor (
        @InjectRepository(CustomerProblem) private readonly customerProblemRepo: Repository<CustomerProblem>,
        @InjectRepository(CustomerProblemsSolution) private readonly customerProblemsSolutionRepo: Repository<CustomerProblemsSolution>
    ){}
    private logger = new Logger('CompaniesCustomersProblemsSolutionsService')
    private entity_prefix_name: string = 'Companies Customers Problems Solution'
    
    async getAll(params: ValidParamId, user: User): Promise<any>{
        const result = await this.customerProblemsSolutionRepo.find({
            where:{
                custom_problems:{
                    id: params.customerProblemId,
                    customer:{
                        id:params.customerId,
                        company: {
                            id: params.companyId
                        }
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
        const result = await this.customerProblemsSolutionRepo.findOne({
            where: {
                id: params.id
            }
        })
        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create( params: ValidParamId, user: User, newData: CreateCustomerProblemsSolutionsDto): Promise<any>{
        const requestFound = await this.customerProblemsSolutionRepo.findOne({ 
            where: { 
                description: newData.description,
                custom_problems: params.customerProblemId
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with that description already exists`)
        }else{   
            try {
                const newCustomerProblemsSolution = new CustomerProblemsSolution()
                newCustomerProblemsSolution.description = newData.description
                newCustomerProblemsSolution.custom_problems = await this.customerProblemRepo.findOne(params.customerProblemId)
                const result = await this.customerProblemsSolutionRepo.save(newCustomerProblemsSolution)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCustomerProblemsSolutionsDto): Promise<any>{
        
        const requestFound = await this.findCustomerProblemSolutionById(params, user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.customerProblemsSolutionRepo.merge(requestFound, updateData)
            const result = await this.customerProblemsSolutionRepo.save(requestFound)
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
        const requestFound = await this.findCustomerProblemSolutionById(params, user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.customerProblemsSolutionRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return {
            result,
            status: 'success'
        }
    }

    private async findCustomerProblemSolutionById(params: ValidParamId, user: User){
        const requestFound = await this.customerProblemsSolutionRepo.findOne({ 
            where: { 
                id: params.id,
                custom_problems:{
                    id: params.customerProblemId,
                    customer:{
                        id:params. customerId,                        
                        company: {
                            id: params.companyId,
                            // created_by: user
                        }                        
                    }

                }
            } 
        })
        return requestFound
    }
}
