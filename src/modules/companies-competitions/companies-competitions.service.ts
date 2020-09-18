import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { CompetitorEntity as CompanyCompetitor } from './competitor.entity'
import { CreateCompanyCompetitorDto } from './dto/create-company-competitor.dto'
import { UpdateCompanyCompetitorDto } from './dto/update-company-competitor.dto'

@Injectable()
export class CompaniesCompetitionsService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(CompanyCompetitor) private readonly companyCompetitorRepo: Repository<CompanyCompetitor> 
    ){}
    private logger = new Logger('CompaniesCompetitionsService')
    private entity_prefix_name: string = 'Company competitor'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{
        const result = await this.companyCompetitorRepo.find({
            select:[
                "name" , "type", "point_of_differentiation", "details", "importance_level", "website" , 
                "id","createdAt", "updatedAt"
            ],
            where: {
                company:{
                    id: params.companyId,
                    // created_by: user
                }
            },            
            order: {
                createdAt: 'DESC'
            }
        });
        return {status: 'success', result}
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const result = await this.findCompanyCostAndRevenueById(params, user)
        if(result){
            return {status: 'success', result}
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyCompetitorDto): Promise<any>{
        const requestFound = await this.companyCompetitorRepo.findOne({ 
            where: { 
                name: newData.name,
                type: newData.type,
                company:{
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.name}' and same type already exists`)
        }else{   
            try {    
                const newEntry = new CompanyCompetitor()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.companyCompetitorRepo.merge(newEntry, saveThis)                   

                const result = await this.companyCompetitorRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCompanyCompetitorDto): Promise<any>{
        
        const requestFound = await this.findCompanyCostAndRevenueById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.companyCompetitorRepo.merge(requestFound, updateData)
            const result = await this.companyCompetitorRepo.save(requestFound)
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
        const requestFound = await this.companyCompetitorRepo.findOne({ 
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

        const result = await this.companyCompetitorRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCompanyCostAndRevenueById(params: ValidParamId, user: User){
        const requestFound = await this.companyCompetitorRepo.findOne({ 
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
