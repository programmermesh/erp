import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { MarketPotentialEntity as MarketPotential } from './market-potential.entity'
import { CreateMarketPotentialDto } from './dto/create-market-potential.dto'
import { UpdateMarketPotentialDto } from './dto/update-market-potential.dto'

@Injectable()
export class CompaniesMarketPotentialsService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(MarketPotential) private readonly companyMarketPotentialRepo: Repository<MarketPotential> 
    ){}
    private logger = new Logger('CompaniesMarketPotentialsService')
    private entity_prefix_name: string = 'Company Market Potential'
    
    async getAll( params: ValidParamId, user: User ): Promise<MarketPotential[]>{
        return await this.companyMarketPotentialRepo.find({
            select:[
                "id","createdAt", "updatedAt",
                "title", "market_size", "current_coverage_size", "description"
            ],
            where: {
                company:{
                    id: params.companyId,
                    created_by: user
                }
            },            
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findCompanyCostAndRevenueById(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateMarketPotentialDto): Promise<any>{
        const requestFound = await this.companyMarketPotentialRepo.findOne({ 
            where: { 
                title: newData.title,
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
                const newEntry = new MarketPotential()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.companyMarketPotentialRepo.merge(newEntry, saveThis)                   

                const result = await this.companyMarketPotentialRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateMarketPotentialDto): Promise<any>{
        
        const requestFound = await this.findCompanyCostAndRevenueById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        try {
            this.companyMarketPotentialRepo.merge(requestFound, updateData)
            const result = await this.companyMarketPotentialRepo.save(requestFound)
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

        const result = await this.companyMarketPotentialRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCompanyCostAndRevenueById(params: ValidParamId, user: User){
        const requestFound = await this.companyMarketPotentialRepo.findOne({ 
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
