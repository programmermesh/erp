import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { PerformanceIndicatorCustomerEntity as PerformanceIndicatorCustomer } from './customer.entity'
import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateCustomersDto } from './dto/create.dto'
import { UpdateCustomersDto } from './dto/update.dto'
import { SearchDto } from './dto/searchDto'

@Injectable()
export class CompaniesPerformanceIndicatorCustomersService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(PerformanceIndicatorCustomer) private readonly performanceIndicatorCustomerRepo: Repository<PerformanceIndicatorCustomer> 
    ){}
    private logger = new Logger('CompaniesPerformanceIndicatorCustomersService')
    private entity_prefix_name: string = 'Performance Indicator Customer'
    
    async getAll( params: ValidParamId, user: User, searchDto: SearchDto ): Promise<any>{
        // const result = await this.performanceIndicatorCustomerRepo.find({
        //     where: {
        //         company:{
        //             id: params.companyId
        //         }
        //     },            
        //     order: {
        //         date_only: 'DESC'
        //     }
        // });

        
        let query = this.performanceIndicatorCustomerRepo.createQueryBuilder('performance_indicator_customers')
        .leftJoin('performance_indicator_customers.company', 'company')
        .where('company.id = :id', { id: params.companyId })

        if(searchDto.from){
            const queryParams = {
                from: new Date(`${searchDto.from}-01`),
                to: new Date(`${searchDto.to}-01`)
            }
    
            query.andWhere( `"performance_indicator_customers"."date_only" BETWEEN :begin AND :end` ,{ begin: queryParams.from, end: queryParams.to })
        }
        const result = await query.getMany()


        return { status: 'success', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const result = await this.findById(params, user)
        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCustomersDto): Promise<any>{
        const requestFound = await this.performanceIndicatorCustomerRepo.findOne({ 
            where: { 
                date_only: newData.date_only,
                company:{
                    id: params.companyId
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`Entry for that date already exists`)
        }else{   
            try {    
                const newEntry = new PerformanceIndicatorCustomer()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.performanceIndicatorCustomerRepo.merge(newEntry, saveThis)                   

                const result = await this.performanceIndicatorCustomerRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCustomersDto): Promise<any>{
        
        const requestFound = await this.findById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        try {
            this.performanceIndicatorCustomerRepo.merge(requestFound, updateData)
            const result = await this.performanceIndicatorCustomerRepo.save(requestFound)
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
        const requestFound = await this.performanceIndicatorCustomerRepo.findOne({ 
            where: { 
                id: params.id,
                company: {
                    id: params.companyId
                }
            } 
        })

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.performanceIndicatorCustomerRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findById(params: ValidParamId, user: User){
        const requestFound = await this.performanceIndicatorCustomerRepo.findOne({ 
            where: { 
                id: params.id,
                company: {
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })
        return requestFound
    }
}

