import { Injectable, NotFoundException, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateCompanyRelationDto } from './dto/create-company-relation.dto'
import { UserEntity as User } from '../users/user.entity'
import { CompanyEntity as Company } from '../companies/company.entity'
import { CompanyRelationEntity as CompanyRelation } from './company-relation.entity'
import { RelationEntity as Relation } from '../relations/relation.entity'

@Injectable()
export class CompaniesRelationsService {
    constructor (
        @InjectRepository(CompanyRelation) private readonly companyRelationRepo: Repository<CompanyRelation>,
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(Relation) private readonly relationRepo: Repository<Relation>
    ){}
    private logger = new Logger('CompaniesRelationsService')
    private entity_prefix_name: string = 'Companies Relations'
    
    async getAll(params: ValidParamId, user: User): Promise<CompanyRelation[]>{
        return await this.companyRelationRepo.find({
            where:{
                companies: {
                    id: params.companyId,
                    // created_by: user
                }                
            }, 
            relations: ['relations'],                       
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findCompanyRelationById(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create( params: ValidParamId, user: User, newData: CreateCompanyRelationDto): Promise<any>{
        const requestFound = await this.companyRelationRepo.findOne({ 
            where: { 
                companies: params.companyId,
                relations: newData.relationsID
            } 
        })
        if(requestFound){
            throw new BadRequestException(`That ${this.entity_prefix_name} already exists`)
            //throw new NotFoundException()
        }else{   
            try {
                const newCompanyRelation = new CompanyRelation()
                newCompanyRelation.relations = await this.relationRepo.findOne(newData.relationsID)
                newCompanyRelation.companies = await this.companyRepo.findOne(params.companyId)
                const result = await this.companyRelationRepo.save(newCompanyRelation)                
                
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
        const requestFound = await this.findCompanyRelationById(params, user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.companyRelationRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCompanyRelationById(params: ValidParamId, user: User){
        const requestFound = await this.companyRelationRepo.findOne({ 
            where: { 
                id: params.id,
                companies: {
                    id: params.companyId,
                    // created_by: user
                }
            },
            relations: ['relations'] 
        })
        return requestFound
    }
}
