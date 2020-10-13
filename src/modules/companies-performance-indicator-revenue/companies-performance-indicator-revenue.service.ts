import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { PerformanceIndicatorRevenueEntity as  PerformanceIndicatorRevenue} from './revenue.entity'
import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateDto } from './dto/create.dto'

@Injectable()
export class CompaniesPerformanceIndicatorRevenueService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(PerformanceIndicatorRevenue) private readonly performanceIndicatorRevenueRepo: Repository<PerformanceIndicatorRevenue> 
    ){}
    private logger = new Logger('CompaniesPerformanceIndicatorRevenueService')
    private entity_prefix_name: string = 'Performance Indicator Revenue'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{
        const result = await this.performanceIndicatorRevenueRepo.find({
            where: {
                company:{
                    id: params.companyId
                }
            },            
            order: {
                date_only: 'DESC'
            }
        });
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

    async create(params: ValidParamId, user: User, newData: CreateDto): Promise<any>{
        const requestFound = await this.performanceIndicatorRevenueRepo.findOne({ 
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
                const newEntry = new PerformanceIndicatorRevenue()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.performanceIndicatorRevenueRepo.merge(newEntry, saveThis)                   

                const result = await this.performanceIndicatorRevenueRepo.save(newEntry)                
                
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

    /*
    async update(params: ValidParamId, user: User, updateData: CreateDto): Promise<any>{
        
        const requestFound = await this.findById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        try {
            this.performanceIndicatorRevenueRepo.merge(requestFound, updateData)
            const result = await this.performanceIndicatorRevenueRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }    */

    async delete(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.performanceIndicatorRevenueRepo.findOne({ 
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

        const result = await this.performanceIndicatorRevenueRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findById(params: ValidParamId, user: User){
        const requestFound = await this.performanceIndicatorRevenueRepo.findOne({ 
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


