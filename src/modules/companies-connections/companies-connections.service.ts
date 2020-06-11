import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { CompanyNetworksEntity as CompanyConnection } from './company-networks.entity'
import { CreateCompanyConnectionkDto } from './dto/create-company-network.dto'
import { UpdateCompanyConnectionkDto } from './dto/update-company-network.dto'

@Injectable()
export class CompaniesConnectionsService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(CompanyConnection) private readonly companyConnectionsRepo: Repository<CompanyConnection> 
    ){}
    private logger = new Logger('CompaniesConnectionsService')
    private entity_prefix_name: string = 'Company Connection'
    
    async getAll( params: ValidParamId, user: User ): Promise<CompanyConnection[]>{
        return await this.companyConnectionsRepo.find({
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
        const requestFound = await this.findCompanyConnectionById(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyConnectionkDto): Promise<any>{
        const requestFound = await this.companyConnectionsRepo.findOne({ 
            where: { 
                invited_company: newData.invited_company,
                company:{
                    id: params.companyId,
                    created_by: user
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`That ${this.entity_prefix_name} already exists`)
        }else{   
            try {    
                const newEntry = new CompanyConnection()
                newEntry.company = await this.companyRepo.findOne(params.companyId)
                newEntry.invited_company = await this.companyRepo.findOne(newData.invited_company)
                newEntry.role = newData.role
                newEntry.message = newData.message                  

                const result = await this.companyConnectionsRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCompanyConnectionkDto): Promise<any>{
        
        const requestFound = await this.findCompanyConnectionById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        try {
            this.companyConnectionsRepo.merge(requestFound, updateData)
            const result = await this.companyConnectionsRepo.save(requestFound)
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
        const requestFound = await this.companyConnectionsRepo.findOne({ 
            where: { 
                id: params.id,
                company: {
                    id: params.companyId,
                    created_by: user
                }
            } 
        })

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.companyConnectionsRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCompanyConnectionById(params: ValidParamId, user: User){
        const requestFound = await this.companyConnectionsRepo.findOne({ 
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
