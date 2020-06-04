import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { CompanyEntity as Company } from './company.entity'
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'

@Injectable()
export class CompaniesService {
    constructor (@InjectRepository(Company) private readonly companyRepo: Repository<Company> ){}
    getCompanies(): Promise<Company[]>{
        return this.companyRepo.find({
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async getCompanyById(id: string){
        const company = await this.companyRepo.findOne({ where: { id } })
        if(company){
            return company
        }else{
            throw new NotFoundException(`Company with ID "${id}" not found`)
        } 
    }

    async createCompany(companyData: CreateCompanyDto){
        const companyExists = await this.companyRepo.findOne({ where: { name: companyData.name } })
        if(companyExists){
            throw new NotFoundException(`Company with name "${companyData.name}" already `)
        }else{
            return 'Company exists'
        }
        
    }

    async updateCompany(id: string, updateData: UpdateCompanyDto): Promise<any>{
        const Company = await this.companyRepo.findOne(id)
        if(Company){
            const result = await this.companyRepo.update(id, updateData)
            if(result.affected === 0){
                throw new NotFoundException(`Company with ID "${id}" could not be updated`)
            }
            return Promise.resolve({
                status: 'success',
                result
            })
        }else{
            throw new NotFoundException(`Company with ID "${id}" not found`)
        } 
                
    }

    async deleteCompany(id: string): Promise<any>{
        // verify first (PENDING)
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
