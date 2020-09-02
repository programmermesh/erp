import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { CostAndRevenuesEntity as CostAndRevenues } from './cost-and-revenues.entity'
import { CreateCompanyCostAndRevenuesDto } from './dto/create-company-cost-and-revenue.dto'
import { UpdateCompanyCostAndRevenuesDto } from './dto/update-company-cost-and-revenue.dto'

@Injectable()
export class CompaniesCostAndRevenuesService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(CostAndRevenues) private readonly companyCostAndRevenuesRepo: Repository<CostAndRevenues> 
    ){}
    private logger = new Logger('CompaniesCostAndRevenuesService')
    private entity_prefix_name: string = 'Company Costs and Revenues'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{
        const result = await this.companyCostAndRevenuesRepo.find({
            select:[
                "title" , "description", "estimated_cost", "type",
                "id","createdAt", "updatedAt"
            ],
            where: {
                company:{
                    id: params.companyId
                }
            },            
            order: {
                createdAt: 'DESC'
            }
        });
        return { status: 'success', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const result = await this.findCompanyCostAndRevenueById(params, user)
        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyCostAndRevenuesDto): Promise<any>{
        const requestFound = await this.companyCostAndRevenuesRepo.findOne({ 
            where: { 
                title: newData.title,
                type: newData.type,
                company:{
                    id: params.companyId,
                    created_by: user
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.title}' already exists`)
        }else{   
            try {    
                const newEntry = new CostAndRevenues()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.companyCostAndRevenuesRepo.merge(newEntry, saveThis)                   

                const result = await this.companyCostAndRevenuesRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCompanyCostAndRevenuesDto): Promise<any>{
        
        const requestFound = await this.findCompanyCostAndRevenueById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.companyCostAndRevenuesRepo.merge(requestFound, updateData)
            const result = await this.companyCostAndRevenuesRepo.save(requestFound)
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
        const requestFound = await this.findCompanyCostAndRevenueById(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.companyCostAndRevenuesRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCompanyCostAndRevenueById(params: ValidParamId, user: User){
        const requestFound = await this.companyCostAndRevenuesRepo.findOne({ 
            where: { 
                id: params.id,
                company: {
                    id: params.companyId,
                    created_by: user
                }
            } 
        })
        return requestFound
    }
}
