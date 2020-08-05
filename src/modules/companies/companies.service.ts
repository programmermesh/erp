import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from './company.entity'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { UserEntity } from '../users/user.entity'

@Injectable()
export class CompaniesService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
    ){}
    private logger = new Logger('Company service')
    
    async getCompanies(user:UserEntity): Promise<Company[]>{
        return await this.companyRepo.find({
            where:{
                created_by: user.id
            },
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async getCompanyById(id: string, user: UserEntity): Promise<any>{
        const company = await this.companyRepo.findOne({ 
            where: { 
                id,
                created_by:user.id
            } 
        })
        if(company){
            return company
        }else{
            throw new NotFoundException(`Company with ID '${id}' not found`)
        } 
    }

    //async createCompany(companyData: CreateCompanyDto, user: UserEntity): Promise<any>{
    async createCompany(companyData: CreateCompanyDto): Promise<any>{
        const user= await this.userRepo.findOne(companyData.user_id)
        if(!user){
            throw new NotFoundException(`User with ID "${companyData.user_id}" not found`)
        }
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
                delete result.created_by.password               
                return { status: 'success', result }
            } catch(error){
                this.logger.error(error.message, error.stack)
                throw new InternalServerErrorException()
            }
        }
        
    }

    async updateCompany(id: string, updateData: UpdateCompanyDto, user: UserEntity): Promise<any>{
        
        const companyExists = await this.companyRepo.findOne({ 
            where: { 
                id,
                created_by: user.id
            } 
        })
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
                created_by: user.id
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
