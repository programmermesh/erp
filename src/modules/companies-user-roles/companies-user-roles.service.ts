import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { RolesEntity as UserRole } from './roles.entity'
import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { CreateCompanyUserRoleDto } from './dto/create-company-user-role.dto'
import { UpdateCompanyUserRoleDto } from './dto/update-company-user-role.dto'
import { ValidParamId } from '../../common/valid-param-id.dto';

@Injectable()
export class CompaniesUserRolesService {
    constructor (
        @InjectRepository(UserRole) private readonly userRoleRepo: Repository<UserRole>,
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>
    ){}
    private logger = new Logger('UserRolesService')
    private entity_prefix_name: string = 'User Role'
    
    async getAll(companyId: string): Promise<UserRole[]>{
        return await this.userRoleRepo.find({
            where: {
                company: companyId 
            },            
            order: {
                name: 'DESC'
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

    async create(companyId:string, user: User, newData: CreateCompanyUserRoleDto): Promise<any>{
        const requestFound = await this.userRoleRepo.findOne({
            // join: { 
            //     alias: 'user_role', 
            //     leftJoinAndSelect: { 
            //         company: 'user_role.company' 
            //     } 
            // },
            where: {
                name: newData.name,  
                company: { 
                    id: companyId , 
                    created_by: user 
                } 
            }                      
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.name}' already exists`)
        }else{ 
            
            try {   
                const newEntry = new UserRole()
                newEntry.name = newData.name
                newEntry.company = await this.companyRepo.findOne(companyId)
                const result = await this.userRoleRepo.save(newEntry)                
                
                return Promise.resolve({
                    status: 'success',
                    result: { id: result.id, name: result.name }
                })
            } catch(error){
                this.logger.error(error.message, error.stack)
                throw new InternalServerErrorException()
            }
        }
        
    }

    async update(params: ValidParamId, user: User, updateData: UpdateCompanyUserRoleDto): Promise<any>{
        
        const requestFound = await this.findOneEntityById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.userRoleRepo.merge(requestFound, updateData)
            const result = await this.userRoleRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }

    async delete(params : ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findOneEntityById(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.userRoleRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findOneEntityById(params: ValidParamId, user: User){
        const requestFound = await this.userRoleRepo.findOne({
            // join: { 
            //     alias: 'user_role', 
            //     leftJoinAndSelect: { 
            //         company: 'user_role.company' 
            //     } 
            // },
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
