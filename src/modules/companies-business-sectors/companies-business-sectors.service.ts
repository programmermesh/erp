import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { BusinessSectorsEntity as BusinessSector } from '../business-sectors/business-sectors.entity'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateCompanyBusinessSectorDto } from './dto/create-company-business-sector.dto'
import { CompanyBusinessSectorsEntity as CompanyBusinessSector } from './company-business-sectors.entity'

@Injectable()
export class CompaniesBusinessSectorsService {
    constructor(
        @InjectRepository(CompanyBusinessSector) private readonly companyBusinessSectorRepo: Repository<CompanyBusinessSector>,
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(BusinessSector) private readonly businessSectorRepo: Repository<BusinessSector>
    ){}

    private logger = new Logger('CompanyBusinessSectorsService')
    private entity_prefix_name: string = 'Company business sector'
    
    async getAll(params: ValidParamId, user: User): Promise<CompanyBusinessSector[]>{
        return await this.companyBusinessSectorRepo.find({
            where: {
                company: {
                    id: params.companyId,
                    created_by: user
                }                
            }
        });
    }

    async getById(params: ValidParamId, user: User): Promise<any>{

        const requestFound = await this.findOneEntityById(params,user)
        
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyBusinessSectorDto): Promise<any>{
        const requestFound = await this.companyBusinessSectorRepo.findOne({
            where: {
                business_sector: newData.business_sector ,
                company: { 
                    id: params.companyId , 
                    created_by: user 
                } 
            }                     
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} already exists`)
        }else{ 
            
            try {   
                const newEntry = new CompanyBusinessSector()
                newEntry.company = await this.companyRepo.findOne(params.companyId)
                newEntry.business_sector = await this.businessSectorRepo.findOne(newData.business_sector)
                const result = await this.companyBusinessSectorRepo.save(newEntry)                
                
                return Promise.resolve({
                    status: 'success',
                    result: { id: result.id }
                })
            } catch(error){
                this.logger.error(error.message, error.stack)
                throw new InternalServerErrorException()
            }
        }
        
    }

    async update(params: ValidParamId, user: User, updateData: CreateCompanyBusinessSectorDto): Promise<any>{
        
        // const requestFound = await this.findOneEntityById(params,user)
        // if(!requestFound){
        //     throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        // }

        // try {
        //     this.companyBusinessSectorRepo.merge(requestFound, updateData)
        //     const result = await this.companyBusinessSectorRepo.save(requestFound)
        //     return Promise.resolve({
        //         status: 'success',
        //         result
        //     })
        // } catch (error) {
        //     this.logger.error(error.message, error.stack)
        //     throw new InternalServerErrorException()
        // }        
                
    }

    async delete(params : ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findOneEntityById(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.companyBusinessSectorRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findOneEntityById(params: ValidParamId, user: User){
        const requestFound = await this.companyBusinessSectorRepo.findOne({
            where: { 
                id: params.id,
                company: { 
                    id: params.companyId ,
                    created_by: user 
                } 
            }                      
        })

        return requestFound
    }
}
