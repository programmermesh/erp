import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Brackets } from 'typeorm';

import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateConnectionGroupsLeadListDto } from './dto/create-company-connection-group-leadlist.dto'
import { SearchDto } from './dto/searchDto'
import { UpdateConnectionGroupsLeadListDto } from './dto/updateDto'
import { ConnectionGroupsLeadListEntity as ConnectionGroupsLeadList } from './connection-groups-lead-list.entity'
import { CompanyEntity as Company } from '../companies/company.entity'
import { ConnectionGroupsEntity as ConnectionGroup } from '../companies-connection-groups/connection-groups.entity'
import { ConnectionGroupsCategoryEntity as ConnectionGroupCategory } from '../companies-connection-groups-categories/company-connection-group-category.entity'

@Injectable()
export class CompaniesConnectionGroupsLeadlistService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(ConnectionGroup) private readonly connectionGroupRepo: Repository<ConnectionGroup>,
        @InjectRepository(ConnectionGroupsLeadList) private readonly companyConnectionGroupsLeadListRepo: Repository<ConnectionGroupsLeadList>,
        @InjectRepository(ConnectionGroupCategory) private readonly connectionGroupCategoryRepo: Repository<ConnectionGroupCategory>  
    ){}
    private logger = new Logger('CompaniesConnectionGroupsLeadListService')
    private entity_prefix_name: string = 'Company Connection Group Lead list'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{
        //const query = await this.companyConnectionGroupsLeadListRepo.createQueryBuilder('')
        const result = await this.companyConnectionGroupsLeadListRepo.createQueryBuilder('connection_groups_lead_list')
            .leftJoinAndSelect('connection_groups_lead_list.connection_group', 'connection_group')
            .leftJoin('connection_group.company', 'main_company')
            .leftJoinAndSelect('connection_group.categories','categories')
            .leftJoinAndSelect('connection_groups_lead_list.lead_list_company', 'company')                    
            .leftJoinAndSelect('company.business_sectors', 'company_business_sectors')
            .leftJoinAndSelect('company_business_sectors.business_sector','system_business_sector')
            .leftJoinAndSelect('company.business_stages', 'company_business_stages')
            .leftJoinAndSelect('company_business_stages.business_stage','system_business_stage')
            .leftJoinAndSelect('company.customer_segments', 'company_customer_segements')
            .leftJoinAndSelect('company_customer_segements.customer_segment','system_customer_segment')
            .leftJoinAndSelect("company.sustainable_goals", "company_sustainable_goals")
            .leftJoinAndSelect('company_sustainable_goals.sustainable_goal',"system_sustainable_goal")
            .leftJoinAndSelect('connection_groups_lead_list.connection_group_category', "connection_group_category" )
            .leftJoinAndSelect("company.created_by", "company_owner")
            .where('main_company.id = :id', { id: params.companyId }) 
            .andWhere('connection_group.id = :groupId', { groupId: params.connection_groupId })
            .orderBy('connection_groups_lead_list.createdAt', 'DESC')              
            .getMany()
        return { status: 'success', result }
    }

    
    //SEARCHING FOR ALL THE LEADLISTS Companies
    async searchAllLeadListFromGroup( params: ValidParamId, searchDto: SearchDto, user: User, ){
        const skippeditems = (searchDto.page - 1) * searchDto.limit

        const totalCount = await this.companyConnectionGroupsLeadListRepo.createQueryBuilder('connection_groups_lead_list')
            .leftJoinAndSelect('connection_groups_lead_list.connection_group', 'connection_group')
            .leftJoin('connection_group.company', 'main_company')
            .leftJoin('connection_groups_lead_list.lead_list_company', 'leadListCompany')   
            .where('main_company.id = :id', { id: params.companyId })
            .andWhere(
                new Brackets(qb => {
                    qb.where("LOWER(leadListCompany.name) like LOWER(:term)", {term: '%' + searchDto.searchWord + '%' })
                        .orWhere('LOWER(leadListCompany.elevator_pitch) like LOWER(:term)', {term: '%' + searchDto.searchWord + '%' })
                        .orWhere('LOWER(leadListCompany.country) like LOWER(:term)', {term: '%' + searchDto.searchWord + '%' })
                        .orWhere("LOWER(leadListCompany.city) like LOWER(:term)", {term: '%' + searchDto.searchWord + '%' })
                })
            ) 
            .orderBy('connection_groups_lead_list.createdAt', 'DESC')  
            .getCount()

        const result = await this.companyConnectionGroupsLeadListRepo.createQueryBuilder('connection_groups_lead_list')
            .leftJoinAndSelect('connection_groups_lead_list.connection_group', 'connection_group')
            .leftJoin('connection_group.company', 'main_company')
            .leftJoinAndSelect('connection_group.categories','categories')
            .leftJoinAndSelect('connection_groups_lead_list.lead_list_company', 'leadListCompany')                    
            .leftJoinAndSelect('leadListCompany.business_sectors', 'leadListCompany_business_sectors')
            .leftJoinAndSelect('leadListCompany_business_sectors.business_sector','leadListCompany_business_sector')
            .leftJoinAndSelect('leadListCompany.business_stages', 'leadListCompany_business_stages')
            .leftJoinAndSelect('leadListCompany_business_stages.business_stage','leadListCompany_business_stage')
            .leftJoinAndSelect('leadListCompany.customer_segments', 'leadListCompany_customer_segements')
            .leftJoinAndSelect('leadListCompany_customer_segements.customer_segment','systemleadListCompany_customer_segment')
            .leftJoinAndSelect("leadListCompany.sustainable_goals", "leadListCompany_sustainable_goals")
            .leftJoinAndSelect('leadListCompany_sustainable_goals.sustainable_goal',"leadListCompany_sustainable_goal")
            .leftJoinAndSelect('connection_groups_lead_list.connection_group_category', "leadListCompany_group_category" )
            .leftJoinAndSelect("leadListCompany.created_by", "company_owner")
            .where('main_company.id = :id', { id: params.companyId })
            .andWhere(
                new Brackets(qb => {
                    qb.where("LOWER(leadListCompany.name) like LOWER(:term)", {term: '%' + searchDto.searchWord + '%' })
                        .orWhere('LOWER(leadListCompany.elevator_pitch) like LOWER(:term)', {term: '%' + searchDto.searchWord + '%' })
                        .orWhere('LOWER(leadListCompany.country) like LOWER(:term)', {term: '%' + searchDto.searchWord + '%' })
                        .orWhere("LOWER(leadListCompany.city) like LOWER(:term)", {term: '%' + searchDto.searchWord + '%' })
                })
            ) 
            .orderBy('connection_groups_lead_list.createdAt', 'DESC')
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

    async getById(params: ValidParamId, user: User): Promise<any>{
        const result = await this.findCompaniesConnectionGroupsLeadListById(params, user)
        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateConnectionGroupsLeadListDto): Promise<any>{
        const requestFound = await this.companyConnectionGroupsLeadListRepo.findOne({ 
            where: { 
                connection_group: {
                    id: params.connection_groupId,                    
                    company:{
                        id: params.companyId,
                        created_by: user
                    }
                },
                lead_list_company: newData.lead_list_companyId
            } 
        })

        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with already exists as leadlist in that connection group`)
        }else{   
            try {    
                const newEntry = new ConnectionGroupsLeadList()
                const connection_group = await this.connectionGroupRepo.findOne(params.connection_groupId)
                newEntry.connection_group = connection_group
                newEntry.lead_list_company = await this.companyRepo.findOne(newData.lead_list_companyId)
                newEntry.notes = newData.notes
                //PUT THE LOGIC OF NEW CATEGORY GROUP HERE **if the category name is 
                if(newData.connection_group_category_name){
                    const findCategory = await this.connectionGroupCategoryRepo.findOne({
                        where: {
                            name: newData.connection_group_category_name.toUpperCase(),
                            connection_group: params.connection_groupId
                        }
                    })
                    
                    if(!findCategory){
                        this.logger.debug('Creating category')
                        //the category was not found so we create it and assis it a category group
                        const newCategoryEntry = new ConnectionGroupCategory()
                        newCategoryEntry.name = newData.connection_group_category_name.toUpperCase()
                        newCategoryEntry.connection_group = connection_group                 

                        const newCategoryEntryResult = await this.connectionGroupCategoryRepo.save(newCategoryEntry)
                        newEntry.connection_group_category = newCategoryEntryResult
                    }else{
                        newEntry.connection_group_category = findCategory
                    }
                }                
                
                const result = await this.companyConnectionGroupsLeadListRepo.save(newEntry)                
                
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
    
    async update(params: ValidParamId, user: User, newData: UpdateConnectionGroupsLeadListDto): Promise<any>{
        const requestFound = await this.findCompaniesConnectionGroupsLeadListById(params, user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} was not found`)
        }else{   
            try {    
                const newEntry = new ConnectionGroupsLeadList()
                const connection_group = await this.connectionGroupRepo.findOne(params.connection_groupId)
                newEntry.connection_group = connection_group
                //newEntry.lead_list_company = await this.companyRepo.findOne(newData.lead_list_companyId)
                newEntry.notes = newData.notes
                
                //PUT THE LOGIC OF NEW CATEGORY GROUP HERE **if the category name is 
                // if(newData.connection_group_category_name){
                //     const findCategory = await this.connectionGroupCategoryRepo.findOne({
                //         where: {
                //             name: newData.connection_group_category_name.toUpperCase(),
                //             connection_group: params.id
                //         }
                //     })
                //     if(!findCategory){
                //         //the category was not found so we create it and assis it a category group
                //         const newCategoryEntry = new ConnectionGroupCategory()
                //         newCategoryEntry.name = newData.connection_group_category_name.toUpperCase()
                //         newCategoryEntry.connection_group = connection_group                 

                //         const newCategoryEntryResult = await this.connectionGroupCategoryRepo.save(newCategoryEntry)
                //         newEntry.connection_group_category = newCategoryEntryResult
                //     }else{
                //         newEntry.connection_group_category = findCategory
                //     }
                // }      
                
                //PUT THE LOGIC OF NEW CATEGORY GROUP HERE **if the category name is 
                if(newData.connection_group_category_name){
                    const findCategory = await this.connectionGroupCategoryRepo.findOne({
                        where: {
                            name: newData.connection_group_category_name.toUpperCase(),
                            connection_group: params.connection_groupId
                        }
                    })
                    
                    if(!findCategory){
                        this.logger.debug('Creating category')
                        //the category was not found so we create it and assis it a category group
                        const newCategoryEntry = new ConnectionGroupCategory()
                        newCategoryEntry.name = newData.connection_group_category_name.toUpperCase()
                        newCategoryEntry.connection_group = connection_group                 

                        const newCategoryEntryResult = await this.connectionGroupCategoryRepo.save(newCategoryEntry)
                        newEntry.connection_group_category = newCategoryEntryResult
                    }else{
                        newEntry.connection_group_category = findCategory
                    }
                }
                this.companyConnectionGroupsLeadListRepo.merge(requestFound, newEntry)
                const result = await this.companyConnectionGroupsLeadListRepo.save(requestFound)  
                
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
    

    async delete(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findCompaniesConnectionGroupsLeadListById(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.companyConnectionGroupsLeadListRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCompaniesConnectionGroupsLeadListById(params: ValidParamId, user: User){
        const requestFound = await this.companyConnectionGroupsLeadListRepo.findOne({ 
            where: { 
                id: params.id,
                connection_group: {
                    id: params.connection_groupId,
                    company: {
                        id: params.companyId,
                        created_by: user
                    }
                }
                
            } 
        })
        return requestFound
    }
}
