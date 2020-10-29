import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Brackets } from 'typeorm';

import { CompanyEntity as Company } from './company.entity'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { PaginationDto } from './dto/pagination.dto';

import { UserEntity } from '../users/user.entity'
import { CompanyCustomerSegmentsEntity as CompanyCustomerSegment } from '../companies-customer-segments/company-customer-segments.entity'
import { CompanyBusinessStagesEntity as CompanyBusinessStage } from '../companies-business-stages/company-business-stages.entity'
import { CompanyBusinessSectorsEntity as CompanyBusinessSector } from '../companies-business-sectors/company-business-sectors.entity'
import { CompanyTeamMembersEntity as CompanyTeamMember } from '../companies-team-members/company-team-members.entity'
import { AccessTypesEntity as AccessType } from '../access-types/access-types.entity'
import { RolesEntity as Role } from '../companies-user-roles/roles.entity'

@Injectable()
export class CompaniesService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
        @InjectRepository(CompanyCustomerSegment) private readonly companyCustomerSegmentRepo: Repository<CompanyCustomerSegment>,
        @InjectRepository(CompanyBusinessStage) private readonly companyBusinessStageRepo: Repository<CompanyBusinessStage>,
        @InjectRepository(CompanyBusinessSector) private readonly companyBusinessSectorRepo: Repository<CompanyBusinessSector>,
        @InjectRepository(CompanyTeamMember) private readonly companyTeamMemberRepo: Repository<CompanyTeamMember>,
        @InjectRepository(AccessType) private readonly accessTypeRepo: Repository<AccessType>,
        @InjectRepository(Role) private readonly roleRepo: Repository<Role>
    ){}
    private logger = new Logger('Company service')
    
    async getCompanies(user:UserEntity): Promise<any>{
        const result = await this.companyRepo.createQueryBuilder('company')
            .where("company.created_by = :owner", {owner: user.id })
            .leftJoinAndSelect('company.created_by', 'company_owner')                      
            .leftJoinAndSelect('company.business_sectors', 'company_business_sectors')
            .leftJoinAndSelect('company_business_sectors.business_sector','system_business_sector')
            .leftJoinAndSelect('company.business_stages', 'company_business_stages')
            .leftJoinAndSelect('company_business_stages.business_stage','system_business_stage')
            .leftJoinAndSelect('company.customer_segments', 'company_customer_segements')
            .leftJoinAndSelect('company_customer_segements.customer_segment','system_customer_segment')
            .leftJoinAndSelect("company.sustainable_goals", "company_sustainable_goals")
            .leftJoinAndSelect('company_sustainable_goals.sustainable_goal',"system_sustainable_goal")
            .leftJoinAndSelect('company.team_members', 'team_members')
            .leftJoinAndSelect('team_members.user', 'memberProfile')
            .orderBy('company.createdAt', 'DESC')              
            .getMany()
        
        return { status: 'success', result }
    }

    async getTeamCompanies(user: UserEntity): Promise<any> {
        const result = await this.companyRepo.createQueryBuilder('company')
            .leftJoinAndSelect('company.created_by', 'company_owner')
            .leftJoinAndSelect('company.business_sectors', 'company_business_sectors')
            .leftJoinAndSelect('company_business_sectors.business_sector','system_business_sector')
            .leftJoinAndSelect('company.business_stages', 'company_business_stages')
            .leftJoinAndSelect('company_business_stages.business_stage','system_business_stage')
            .leftJoinAndSelect('company.customer_segments', 'company_customer_segements')
            .leftJoinAndSelect('company_customer_segements.customer_segment','system_customer_segment')
            .leftJoinAndSelect("company.sustainable_goals", "company_sustainable_goals")
            .leftJoinAndSelect('company_sustainable_goals.sustainable_goal',"system_sustainable_goal")
            .leftJoinAndSelect('company.team_members', 'team_members')
            .leftJoinAndSelect('team_members.user', 'memberProfile')
            .where('team_members.invite_email = :email', { email: user.email })
            .andWhere('team_members.invite_accepted = :accepted', { accepted: true })
            .andWhere('company.created_by != :user', { user: user.id })
            .orderBy('company.createdAt', 'DESC')
            .getMany()
        return { status: 'success', result }
    }

    async getMyPendingInvitations(user: UserEntity) : Promise<any> {
        const result = await this.companyTeamMemberRepo.createQueryBuilder('company_team_members')                  
            .leftJoinAndSelect('company_team_members.role', 'role')
            .leftJoinAndSelect('company_team_members.access_type', 'access')
            .leftJoinAndSelect('company_team_members.company', 'company')
            .where("company_team_members.invite_email = :email", { email: user.email })
            .andWhere('company_team_members.invite_accepted = :accepted', { accepted: false })
            .orderBy('company_team_members.createdAt', 'DESC')    
            .getMany()
        return { status: 'success', result }
    }

    async explore(paginationDto: PaginationDto, user: UserEntity): Promise<any>{
        const skippeditems = (paginationDto.page - 1) * paginationDto.limit

        //const totalCount = await this.companyRepo.count()
        const totalCount = await this.companyRepo.createQueryBuilder('company')
            .where('company.created_by != :id', { id: user.id} )
            .andWhere(
                new Brackets(qb => {
                    qb.where("LOWER(company.name) like LOWER(:term)", {term: '%' + paginationDto.searchWord + '%' })
                    .orWhere('LOWER(company.elevator_pitch) like LOWER(:term)', {term: '%' + paginationDto.searchWord + '%' })
                    .orWhere('LOWER(company.country) like LOWER(:term)', {term: '%' + paginationDto.searchWord + '%' })
                    .orWhere("LOWER(company.city) like LOWER(:term)", {term: '%' + paginationDto.searchWord + '%' })
                })
            )       
            .leftJoinAndSelect("company.created_by", "company_owner")                      
            .leftJoinAndSelect("company.business_sectors", "company_business_sectors")
            .leftJoinAndSelect('company_business_sectors.business_sector',"system_business_sector")
            .leftJoinAndSelect("company.business_stages", "company_business_stages")
            .leftJoinAndSelect('company_business_stages.business_stage',"system_business_stage")
            .leftJoinAndSelect("company.customer_segments", "company_customer_segements")
            .leftJoinAndSelect('company_customer_segements.customer_segment',"system_customer_segment")
            .leftJoinAndSelect('company.team_members', 'team_members')
            .leftJoinAndSelect('team_members.user', 'memberProfile')
            .getCount()
        

        const result = await this.companyRepo.createQueryBuilder('company')            
            .where('company.created_by != :id', { id: user.id} )
            .andWhere(
                new Brackets(qb => {
                    qb.where("LOWER(company.name) like LOWER(:term)", {term: '%' + paginationDto.searchWord + '%' })
                    .orWhere('LOWER(company.elevator_pitch) like LOWER(:term)', {term: '%' + paginationDto.searchWord + '%' })
                    .orWhere('LOWER(company.country) like LOWER(:term)', {term: '%' + paginationDto.searchWord + '%' })
                    .orWhere("LOWER(company.city) like LOWER(:term)", {term: '%' + paginationDto.searchWord + '%' })
                })
            )
            .leftJoinAndSelect('company.created_by', 'company_owner')                      
            .leftJoinAndSelect('company.business_sectors', 'company_business_sectors')
            .leftJoinAndSelect('company_business_sectors.business_sector','system_business_sector')
            .leftJoinAndSelect('company.business_stages', 'company_business_stages')
            .leftJoinAndSelect('company_business_stages.business_stage','system_business_stage')
            .leftJoinAndSelect('company.customer_segments', 'company_customer_segements')
            .leftJoinAndSelect('company_customer_segements.customer_segment','system_customer_segment')
            .leftJoinAndSelect("company.sustainable_goals", "company_sustainable_goals")
            .leftJoinAndSelect('company_sustainable_goals.sustainable_goal',"system_sustainable_goal")
            .leftJoinAndSelect('company.team_members', 'team_members')
            .leftJoinAndSelect('team_members.user', 'memberProfile')
            .orderBy('company.createdAt', 'DESC')           
            .skip(skippeditems)
            .take(paginationDto.limit)           
            .getMany()
            
        return { 
            status: 'success', 
            result,
            page: paginationDto.page,
            limit: paginationDto.limit,
            totalCount
        }
    }

    async getCompanyById(id: string, user: UserEntity): Promise<any>{
        const result = await this.companyRepo.findOne({ 
            where: { 
                id,
                //created_by:user.id
            } 
        })
        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`Company with ID '${id}' not found`)
        } 
    }

    private async getCompanyProfileById(company: Company, user:UserEntity) {
        const result = await this.companyRepo.createQueryBuilder('company')
            //.where("company.created_by = :owner", {owner: user.id })
            .andWhere("company.id = :id", { id: company.id})   
            .leftJoinAndSelect('company.created_by', 'company_owner')                   
            .leftJoinAndSelect('company.business_sectors', 'company_business_sectors')
            .leftJoinAndSelect('company_business_sectors.business_sector','system_business_sector')
            .leftJoinAndSelect('company.business_stages', 'company_business_stages')
            .leftJoinAndSelect('company_business_stages.business_stage','system_business_stage')
            .leftJoinAndSelect('company.customer_segments', 'company_customer_segements')
            .leftJoinAndSelect('company_customer_segements.customer_segment','system_customer_segment')
            .leftJoinAndSelect("company.sustainable_goals", "company_sustainable_goals")
            .leftJoinAndSelect('company_sustainable_goals.sustainable_goal',"system_sustainable_goal")
            .leftJoinAndSelect('company.team_members', 'team_members')
            .leftJoinAndSelect('team_members.user', 'memberProfile')              
            .getOne()   
        return result     
    }

    async createCompany(companyData: CreateCompanyDto, user: UserEntity): Promise<any>{
        const companyExists = await this.companyRepo.findOne({ 
            where: { 
                name: companyData.name,
                created_by: user
            } 
        })
        if(companyExists){
            throw new NotFoundException(`Company with name '${companyData.name}' already registered by this user `)
        }else{            
            const newCompany = new Company()
            
            const { address, city, country, company_size, email, name, phone, website, interested_in_investment, max_investment_amount, minimum_investment_amount } = companyData
            newCompany.address = address
            newCompany.city = city
            newCompany.country = country
            newCompany.company_size = company_size 
            newCompany.email = email
            newCompany.name = name
            newCompany.phone = phone
            newCompany.website = website
            newCompany.interested_in_investment = interested_in_investment
            newCompany.max_investment_amount = max_investment_amount 
            newCompany.minimum_investment_amount = minimum_investment_amount
            newCompany.created_by = user

            try {
                const result = await this.companyRepo.save(newCompany) 
                
                //save the customer segments
                let customer_segments_result = []
                if(companyData.customer_segments.length > 0){
                    // for (const [idx, element] of companyData.customer_segments.entries()) {
                    //     const newEntry = new CompanyCustomerSegment()
                    //     newEntry.company = result
                    //     newEntry.customer_segment = element
                    //     const newResult = await this.companyCustomerSegmentRepo.save(newEntry)
                    //     customer_segments_result.push(newResult)
                    // }  
                    let savedData = await this.saveCustomerSegments(result, companyData.customer_segments)
                    customer_segments_result = [...savedData]                   
                }

                //save the business stages
                let business_stages_result = []
                if(companyData.business_stages.length > 0){  
                    let savedData = await this.saveBusinessStages(result, companyData.business_stages)
                    business_stages_result = [...savedData]            
                }

                //save the business sectors
                let business_sectors_result = []
                if(companyData.business_sectors.length > 0){    
                    let savedData = await this.saveBusinessSectors(result, companyData.business_sectors)
                    business_sectors_result = [...savedData]             
                }

                /* CREATE THE OWNER AS A TEAM MEMBER */
                const newTeamMemberData = new CompanyTeamMember()
                newTeamMemberData.company = result
                newTeamMemberData.user = user
                newTeamMemberData.invite_email = user.email
                newTeamMemberData.invite_accepted = true
                newTeamMemberData.access_type = await this.accessTypeRepo.findOne({
                    where: { name: 'Admin' }
                })
                

                // DEFAULT ROLES FOR THE COMPANY
                const default_roles = ['CO-FOUNDER', 'CTO', 'CFO', 'CIO', 'PRO', 'OWNER']
                for (let index = 0; index < default_roles.length; index++) {
                    const newEntry = new Role()
                    newEntry.name = default_roles[index]
                    newEntry.company = result
                    await this.roleRepo.save(newEntry)  
                }

                //check if the role exists
                const userRoleFound = await this.roleRepo.findOne({
                    where: {
                        name: "OWNER",  
                        company: {  id: result.id } 
                    }                      
                }) 
                if(userRoleFound){
                    newTeamMemberData.role = userRoleFound
                }else{
                    //create a new user role
                    const newEntry = new Role()
                    newEntry.name = 'OWNER'
                    newEntry.company = result
                    newTeamMemberData.role = await this.roleRepo.save(newEntry)  
                }
                await this.companyTeamMemberRepo.save(newTeamMemberData)
                /* END - CREATE THE OWNER AS A TEAM MEMBER */

                //delete result.created_by.password
                let final_result = { ...result, business_sectors_result, business_stages_result, customer_segments_result }  
                return { status: 'success', result: final_result }
            } catch(error){
                this.logger.error(error.message, error.stack)
                throw new InternalServerErrorException()
            }
        }
        
    }
    
    private async saveBusinessSectors(company: Company, data: any) {
        await this.companyBusinessSectorRepo.delete({company}) //DELETE ALL ENTRIES OF THAT COMPANY
        let result = []
        for (const [idx, element] of data.entries()) {
            const newEntry = new CompanyBusinessSector()
            newEntry.company = company
            newEntry.business_sector = element
            const newResult = await this.companyBusinessSectorRepo.save(newEntry)  
            result.push(newResult)
        }  
        return result              
    }

    private async saveBusinessStages(company: Company, data: any) {
        await this.companyBusinessStageRepo.delete({company}) //DELETE ALL ENTRIES OF THAT COMPANY
        let result = []
        for (const [idx, element] of data.entries()) {
            const newEntry = new CompanyBusinessStage()
            newEntry.company = company
            newEntry.business_stage = element
            const newResult = await this.companyBusinessStageRepo.save(newEntry)  
            result.push(newResult)
        }  
        return result              
    }

    private async saveCustomerSegments(company: Company, data: any) {
        await this.companyCustomerSegmentRepo.delete({company}) //DELETE ALL ENTRIES OF THAT COMPANY
        let result = []
        for (const [idx, element] of data.entries()) {
            const newEntry = new CompanyCustomerSegment()
            newEntry.company = company
            newEntry.customer_segment = element
            const newResult = await this.companyCustomerSegmentRepo.save(newEntry)
            result.push(newResult)
        }   
        return result              
    }

    async updateCompany(id: string, updateData: UpdateCompanyDto, user: UserEntity): Promise<any>{
        
        const companyExists = await this.companyRepo.findOne({ 
            where: { 
                id,
                // created_by: user.id
            } 
        })
        if(!companyExists){
            throw new NotFoundException(`Company with ID '${id}' cannot be found `)
        }

        try {
            this.companyRepo.merge(companyExists, updateData)
            console.log(updateData)
            const result = await this.companyRepo.save(companyExists)
            //save the customer segments
            if(updateData.customer_segments && updateData.customer_segments.length > 0){
                let savedData = await this.saveCustomerSegments(result, updateData.customer_segments)                
            }

            //save the business stages
            if(updateData.business_stages && updateData.business_stages.length > 0){  
                let savedData = await this.saveBusinessStages(result, updateData.business_stages)           
            }

            //save the business sectors
            if(updateData.business_sectors && updateData.business_sectors.length > 0){    
                let savedData = await this.saveBusinessSectors(result, updateData.business_sectors)            
            }

            //delete result.created_by.password
            //let final_result = { ...result, business_sectors_result, business_stages_result, customer_segments_result }  
            let final_result = await this.getCompanyProfileById(result, user)
            return { status: 'success', result: final_result }
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }     
    }
    

    async updateCompanyRegistration(id: string, updateData: UpdateCompanyDto): Promise<any>{
    //async updateCompany(id: string, updateData: UpdateCompanyDto, user: UserEntity): Promise<any>{
        
        const companyExists = await this.companyRepo.findOne({ 
            where: { 
                id
            } 
        })
        if(!companyExists){
            throw new NotFoundException(`Company with ID '${id}' cannot be found `)
        }

        try {
            this.companyRepo.merge(companyExists, updateData)
            const result = await this.companyRepo.save(companyExists)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }     
    }

    async updateCompanyMissionVision(id:string, updateData: UpdateCompanyDto){
        const companyExists = await this.companyRepo.findOne(id)
        if(!companyExists){
            throw new NotFoundException(`Company with ID '${id}' by current user cannot be found `)
        }

        try {
            this.companyRepo.merge(companyExists, updateData)
            const result = await this.companyRepo.save(companyExists)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }  
    }

    async deleteCompany(id: string, user: UserEntity): Promise<any>{
        const companyExists = await this.companyRepo.findOne({ 
            where: { 
                id,
                created_by: user.id // ONLY THE OWNER CAN DELETE THE COMPANY
            } 
        })

        if(!companyExists){
            throw new NotFoundException(`Company with ID '${id}' by current user cannot be found `)
        }

        const result = await this.companyRepo.delete(id)
        if(result.affected === 0){
            throw new NotFoundException(`Company with ID "${id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }
}
