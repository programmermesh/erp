import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { ConnectedHubEntity as ConnectedHub } from './connected-hub.entity'
import { CreateConnectedHubDto } from './dto/create.dto'
import { UpdateConnectedHubDto } from './dto/update.dto'

@Injectable()
export class CompaniesConnectedHubService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(ConnectedHub) private readonly connectedHubRepo: Repository<ConnectedHub> 
    ){}
    private logger = new Logger('CompaniesConnectedHubService')
    private entity_prefix_name: string = 'Company Connected Hub'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{
        const result = await this.connectedHubRepo.find({
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
        const result = await this.findById(params, user)
        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateConnectedHubDto): Promise<any>{
        const requestFound = await this.connectedHubRepo.findOne({ 
            where: { 
                title: newData.title,
                company:{
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with title '${newData.title}' already exists`)
        }else{   
            try {    
                const newEntry = new ConnectedHub()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.connectedHubRepo.merge(newEntry, saveThis)                   

                const result = await this.connectedHubRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateConnectedHubDto): Promise<any>{
        
        const requestFound = await this.findById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.connectedHubRepo.merge(requestFound, updateData)
            const result = await this.connectedHubRepo.save(requestFound)
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
        const requestFound = await this.connectedHubRepo.findOne({ 
            where: { 
                id: params.id,
                company: {
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.connectedHubRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findById(params: ValidParamId, user: User){
        const requestFound = await this.connectedHubRepo.findOne({ 
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

