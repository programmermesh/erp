import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateConnectionGroupsLeadListDto } from './dto/create-company-connection-group-leadlist.dto'
import { ConnectionGroupsLeadListEntity as ConnectionGroupsLeadList } from './connection-groups-lead-list.entity'
import { LeadListEntity as LeadList } from '../companies-lead-list/lead-list.entity'
import { ConnectionGroupsEntity as ConnectionGroup } from '../companies-connection-groups/connection-groups.entity'

@Injectable()
export class CompaniesConnectionGroupsLeadlistService {
    // constructor (
    //     @InjectRepository(LeadList) private readonly leadListRepo: Repository<LeadList>,
    //     @InjectRepository(ConnectionGroup) private readonly connectionGroupRepo: Repository<ConnectionGroup>,
    //     @InjectRepository(ConnectionGroupsLeadList) private readonly companyConnectionGroupsLeadListRepo: Repository<ConnectionGroupsLeadList> 
    // ){}
    // private logger = new Logger('CompaniesConnectionGroupsLeadListService')
    // private entity_prefix_name: string = 'Company Costs and Revenues'
    
    // async getAll( params: ValidParamId, user: User ): Promise<ConnectionGroupsLeadList[]>{
    //     return await this.companyConnectionGroupsLeadListRepo.find({
    //         where: {
    //             connection_group:{
    //                 company:{
    //                     id: params.companyId,
    //                     created_by: user
    //                 }
    //             }
    //         },            
    //         order: {
    //             createdAt: 'DESC'
    //         }
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

    // async create(params: ValidParamId, user: User, newData: CreateConnectionGroupsLeadListDto): Promise<any>{
    //     const requestFound = await this.companyConnectionGroupsLeadListRepo.findOne({ 
    //         where: { 
    //             connection_group: {                    
    //                 company:{
    //                     id: params.companyId,
    //                     created_by: user
    //                 }
    //             },
    //         } 
    //     })
    //     if(requestFound){
    //         throw new NotFoundException(`${this.entity_prefix_name} with already exists`)
    //     }else{   
    //         try {    
    //             const newEntry = new ConnectionGroupsLeadList()
    //             const saveThis = {
    //                 ...newData,
    //                 company: await this.companyRepo.findOne(params.companyId)
    //             }
    //             this.companyConnectionGroupsLeadListRepo.merge(newEntry, saveThis)                   

    //             const result = await this.companyConnectionGroupsLeadListRepo.save(newEntry)                
                
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

    // async update(params: ValidParamId, user: User, updateData: UpdateCompanyConnectionGroupsLeadListDto): Promise<any>{
        
    //     const requestFound = await this.findCompanyCostAndRevenueById(params,user)
    //     if(!requestFound){
    //         throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
    //     }

    //     try {
    //         this.companyConnectionGroupsLeadListRepo.merge(requestFound, updateData)
    //         const result = await this.companyConnectionGroupsLeadListRepo.save(requestFound)
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
    //     const requestFound = await this.companyConnectionGroupsLeadListRepo.findOne({ 
    //         where: { 
    //             id: params.id,
    //             company: {
    //                 id: params.companyId,
    //                 created_by: user
    //             }
    //         } 
    //     })

    //     if(!requestFound){
    //         throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
    //     }

    //     const result = await this.companyConnectionGroupsLeadListRepo.delete(params.id)
    //     if(result.affected === 0){
    //         throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
    //     }

    //     return Promise.resolve({
    //         result,
    //         status: 'success'
    //     })
    // }

    // private async findCompanyCostAndRevenueById(params: ValidParamId, user: User){
    //     const requestFound = await this.companyConnectionGroupsLeadListRepo.findOne({ 
    //         where: { 
    //             id: params.id,
    //             company: {
    //                 id: params.companyId,
    //                 created_by: user
    //             }
    //         } 
    //     })
    //     return requestFound
    // }
}
