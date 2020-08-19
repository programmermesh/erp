import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Brackets } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { CompanyNetworksEntity as CompanyConnection } from './company-networks.entity'
import { CreateCompanyConnectionkDto } from './dto/create-company-network.dto'
import { UpdateCompanyConnectionkDto } from './dto/update-company-network.dto'
import { SearchDto } from './dto/searchDto'

@Injectable()
export class CompaniesConnectionsService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(CompanyConnection) private readonly companyConnectionsRepo: Repository<CompanyConnection> 
    ){}
    private logger = new Logger('CompaniesConnectionsService')
    private entity_prefix_name: string = 'Company Network'
    
    async getAll( params: ValidParamId, searchDto: SearchDto, user: User ): Promise<any>{

        const skippeditems = (searchDto.page - 1) * searchDto.limit

        const totalCount = await this.companyConnectionsRepo.createQueryBuilder('company_network_connections')
            .leftJoin('company_network_connections.invited_company', 'invited_company')
            .leftJoin('company_network_connections.company', 'main_company')  
            .where('main_company.id = :id', { id: params.companyId })
            
            .andWhere(
                new Brackets(qb => {
                    qb.where("LOWER(invited_company.name) like LOWER(:term)", {term: '%' + searchDto.searchWord + '%' })
                        .orWhere('LOWER(invited_company.elevator_pitch) like LOWER(:term)', {term: '%' + searchDto.searchWord + '%' })
                        .orWhere('LOWER(invited_company.country) like LOWER(:term)', {term: '%' + searchDto.searchWord + '%' })
                        .orWhere("LOWER(invited_company.city) like LOWER(:term)", {term: '%' + searchDto.searchWord + '%' })
                        .orWhere("LOWER(company_network_connections.reason) like LOWER(:term)", {term: '%' + searchDto.searchWord + '%' })
                })
            ) 
            .orderBy('company_network_connections.createdAt', 'DESC')  
            .getCount()
        
        let query = this.companyConnectionsRepo.createQueryBuilder('company_network_connections')
            .leftJoinAndSelect('company_network_connections.invited_company', 'invited_company')
            .leftJoin('company_network_connections.company', 'main_company')                    
            .leftJoinAndSelect('invited_company.business_sectors', 'invited_company_business_sectors')
            .leftJoinAndSelect('invited_company_business_sectors.business_sector','invited_company_business_sector')
            .leftJoinAndSelect('invited_company.business_stages', 'invited_company_business_stages')
            .leftJoinAndSelect('invited_company_business_stages.business_stage','invited_company_business_stage')
            .leftJoinAndSelect('invited_company.customer_segments', 'invited_company_customer_segements')
            .leftJoinAndSelect('invited_company_customer_segements.customer_segment','invited_company_customer_segment')
            .leftJoinAndSelect("invited_company.sustainable_goals", "invited_company_sustainable_goals")
            .leftJoinAndSelect('invited_company_sustainable_goals.sustainable_goal',"invited_company_sustainable_goal")
            .leftJoinAndSelect("invited_company.created_by", "company_owner")
            .where('main_company.id = :id', { id: params.companyId })
            .andWhere(
                new Brackets(qb => {
                    qb.where("LOWER(invited_company.name) like LOWER(:term)", {term: '%' + searchDto.searchWord + '%' })
                        .orWhere('LOWER(invited_company.elevator_pitch) like LOWER(:term)', {term: '%' + searchDto.searchWord + '%' })
                        .orWhere('LOWER(invited_company.country) like LOWER(:term)', {term: '%' + searchDto.searchWord + '%' })
                        .orWhere("LOWER(invited_company.city) like LOWER(:term)", {term: '%' + searchDto.searchWord + '%' })
                        .orWhere("LOWER(company_network_connections.reason) like LOWER(:term)", {term: '%' + searchDto.searchWord + '%' })
                })
            )
        
        if(searchDto.connection_status){
            query.andWhere('company_network_connections.invitation_status = :status', { status: searchDto.connection_status })
        }

        const result = await query.orderBy('company_network_connections.createdAt', 'DESC')
            .skip(skippeditems)              
            .take(searchDto.limit)           
            .getMany()
            
        return { 
            status: 'success', 
            result,
            page: searchDto.page,
            limit: searchDto.limit,
            totalCount
        }
    }

    async getAnalyticData(params: ValidParamId, user: User): Promise<any>{
        // WE WILL RESPOND WITH THE TOTALS AND A SUMMARY OF THE LAST 5 entries
        const totalPending = await this.companyConnectionsRepo.createQueryBuilder('company_network_connections')
            .leftJoin('company_network_connections.invited_company', 'invited_company')
            .leftJoin('company_network_connections.company', 'main_company')  
            .where('main_company.id = :id', { id: params.companyId })
            .andWhere("company_network_connections.invitation_status = :status", { status: 'pending' })
            .getCount()
        
        const totalAccepted = await this.companyConnectionsRepo.createQueryBuilder('company_network_connections')
            .leftJoin('company_network_connections.invited_company', 'invited_company')
            .leftJoin('company_network_connections.company', 'main_company')  
            .where('main_company.id = :id', { id: params.companyId })
            .andWhere("company_network_connections.invitation_status = :status", { status: 'accepted' })  
            .getCount()

        const totalDeclined = await this.companyConnectionsRepo.createQueryBuilder('company_network_connections')
            .leftJoin('company_network_connections.invited_company', 'invited_company')
            .leftJoin('company_network_connections.company', 'main_company')  
            .where('main_company.id = :id', { id: params.companyId })
            .andWhere("company_network_connections.invitation_status = :status", { status: 'declined' })  
            .getCount()

        return {
            status: 'success',
            result :{
                totalPending,
                totalAccepted,
                totalDeclined
            }
        }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const result = await this.findCompanyConnectionById(params, user)
        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async getAllReasons(params: ValidParamId, user: User): Promise<any>{

        const result = await this.companyConnectionsRepo.createQueryBuilder('company_network_connections')
            .select("company_network_connections.reason")
            .leftJoin('company_network_connections.invited_company', 'invited_company')
            .leftJoin('company_network_connections.company', 'main_company') 
            .where('main_company.id = :id', { id: params.companyId })
            .groupBy('company_network_connections.reason')
            .addGroupBy('company_network_connections.id')
            .orderBy('company_network_connections.createdAt', 'DESC')           
            .getMany()
        return { status: 'success', result }
         
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
            throw new NotFoundException(`That ${this.entity_prefix_name} with this company already exists`)
        }else{   
            try {    
                const newEntry = new CompanyConnection()
                newEntry.company = await this.companyRepo.findOne(params.companyId)
                newEntry.invited_company = await this.companyRepo.findOne(newData.invited_company)
                newEntry.reason = newData.reason
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
