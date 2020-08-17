import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { LeadListEntity as LeadList } from './lead-list.entity'
import { CreateLeadListDto } from './dto/create-company-lead-list.dto'
import { UpdateLeadListDto } from './dto/update-company-lead-list.dto'

@Injectable()
export class CompaniesLeadListService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(LeadList) private readonly companyLeadListRepo: Repository<LeadList> 
    ){}
    private logger = new Logger('CompaniesLeadListService')
    // private entity_prefix_name: string = 'Company Lead list'
    
    // async getAll( params: ValidParamId, user: User ): Promise<LeadList[]>{
    //     return await this.companyLeadListRepo.find({
    //         where: {
    //             main_company:{
    //                 id: params.companyId,
    //                 created_by: user
    //             }
    //         },            
    //         order: {
    //             createdAt: 'DESC'
    //         },
    //         relations: ['added_lead_company']
    //     });
    // }

    // async getById(params: ValidParamId, user: User): Promise<any>{
    //     const requestFound = await this.findCompanyCostAndRevenueById(params, user)
    //     if(requestFound){
    //         return requestFound
    //     }else{
    //         throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
    //     } 
    // }

    // async create(params: ValidParamId, user: User, newData: CreateLeadListDto): Promise<any>{
    //     const requestFound = await this.companyLeadListRepo.findOne({ 
    //         where: { 
    //             lead_company: newData.added_lead_company,
    //             main_company:{
    //                 id: params.companyId,
    //                 created_by: user
    //             }
    //         } 
    //     })
    //     if(requestFound){
    //         throw new NotFoundException(`That ${this.entity_prefix_name} with already exists`)
    //     }else{   
    //         try {    
    //             const newEntry = new LeadList()
    //             newEntry.main_company = await this.companyRepo.findOne(params.companyId)
    //             newEntry.added_lead_company = await this.companyRepo.findOne(params.companyId)
    //             if(newData.notes){
    //                 newEntry.notes = newData.notes
    //             }                 

    //             const result = await this.companyLeadListRepo.save(newEntry)              
                
    //             return Promise.resolve({
    //                 status: 'success',
    //                 result
    //             })
    //         } catch(error){
    //             this.logger.error(error.message, error.stack)
    //             throw new InternalServerErrorException()
    //         }
    //     }
        
    // }

    // async update(params: ValidParamId, user: User, updateData: UpdateLeadListDto): Promise<any>{
        
    //     const requestFound = await this.findCompanyCostAndRevenueById(params,user)
    //     if(!requestFound){
    //         throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
    //     }

    //     try {
    //         this.companyLeadListRepo.merge(requestFound, updateData)
    //         const result = await this.companyLeadListRepo.save(requestFound)
    //         return Promise.resolve({
    //             status: 'success',
    //             result
    //         })
    //     } catch (error) {
    //         this.logger.error(error.message, error.stack)
    //         throw new InternalServerErrorException()
    //     }        
                
    // }
    

    // async delete(params: ValidParamId, user: User): Promise<any>{
    //     const requestFound = await this.companyLeadListRepo.findOne({ 
    //         where: { 
    //             id: params.id,
    //             main_company: {
    //                 id: params.companyId,
    //                 created_by: user
    //             }
    //         } 
    //     })

    //     if(!requestFound){
    //         throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
    //     }

    //     const result = await this.companyLeadListRepo.delete(params.id)
    //     if(result.affected === 0){
    //         throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
    //     }

    //     return Promise.resolve({
    //         result,
    //         status: 'success'
    //     })
    // }

    // private async findCompanyCostAndRevenueById(params: ValidParamId, user: User){
    //     const requestFound = await this.companyLeadListRepo.findOne({ 
    //         where: { 
    //             id: params.id,
    //             main_company: {
    //                 id: params.companyId,
    //                 created_by: user
    //             }
    //         },
    //         relations:["added_lead_company"] 
    //     })
    //     return requestFound
    // }
}
