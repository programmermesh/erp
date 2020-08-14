import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { uploadImageToS3 } from '../../utils/s3UploadImages'
import { ConnectionGroupsEntity as ConnectionGroup } from './connection-groups.entity'
import { ConnectionGroupsCategoryEntity as ConnectionGroupCategory } from '../companies-connection-groups-categories/company-connection-group-category.entity'
import { CreateConnectionGroupsDto } from './dto/create-company-connection-group.dto'
import { UpdateConnectionGroupsDto } from './dto/update-company-connection-group.dto'

@Injectable()
export class CompaniesConnectionGroupsService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(ConnectionGroup) private readonly companyConnectionGroupRepo: Repository<ConnectionGroup> ,
        @InjectRepository(ConnectionGroupCategory) private readonly companyConnectionGroupCategoryRepo: Repository<ConnectionGroupCategory>
    ){}
    private logger = new Logger('CompaniesConnectionGroupService')
    private entity_prefix_name: string = 'Company Connection Groups'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{
        const result = await this.companyConnectionGroupRepo.find({
            select:[
                "name","connection_group_cover_photo","notes",
                "id","createdAt", "updatedAt"
            ],
            where: {
                company:{
                    id: params.companyId,
                    created_by: user
                }
            },            
            order: {
                createdAt: 'DESC'
            },
            relations:['categories']
        });
        
        return { status: 'success', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findCompanyConnectionGroupById(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateConnectionGroupsDto): Promise<any>{
        const requestFound = await this.companyConnectionGroupRepo.findOne({ 
            where: { 
                name:newData.name.toUpperCase(),
                company:{
                    id: params.companyId,
                    created_by: user
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.name}' already exists`)
        }else{   
            try {    
                const newEntry = new ConnectionGroup()
                const {save_in, ...groupData} = newData
                const saveThis = {
                    ...groupData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.companyConnectionGroupRepo.merge(newEntry, saveThis)                   

                const result = await this.companyConnectionGroupRepo.save(newEntry)
                
                //SAVE THE CATEGORIES
                let categories = []
                if(save_in && save_in.length > 0){                                     
                   for (let category of save_in){
                       const newCategory = new ConnectionGroupCategory()
                       newCategory.name = category.toUpperCase()
                       newCategory.connection_group = result
                       const newResult = await this.companyConnectionGroupCategoryRepo.save(newCategory)
                       categories.push({
                           id: newResult.id,
                           name: newResult.name
                        })
                   }
                }               

                const final_result = { ...result, categories }
                
                return Promise.resolve({
                    status: 'success',
                    result: final_result
                })
            } catch(error){
                this.logger.error(error.message, error.stack)
                throw new InternalServerErrorException()
            }
        }
        
    }

    async update(params: ValidParamId, user: User, updateData: UpdateConnectionGroupsDto): Promise<any>{
        
        const requestFound = await this.findCompanyConnectionGroupById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.companyConnectionGroupRepo.merge(requestFound, updateData)
            const result = await this.companyConnectionGroupRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }

    async uploadConnectionGroupCoverImage(params: ValidParamId, user: User, file:any){
        const requestFound = await this.findCompanyConnectionGroupById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        const urlKey = `connection_groups_cover_photos/${params.companyId}/${Date.now().toString()}-${file.originalname}`
        
        const data = await uploadImageToS3(
            params,
            file,
            urlKey
        )
        if(data.success){
            //update the sustainable goal table
            requestFound.connection_group_cover_photo = data.url
            const updateImage = await this.companyConnectionGroupRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result: updateImage
            }) 
        }
    }
    

    async delete(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.companyConnectionGroupRepo.findOne({ 
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

        const result = await this.companyConnectionGroupRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCompanyConnectionGroupById(params: ValidParamId, user: User){
        const requestFound = await this.companyConnectionGroupRepo.findOne({ 
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
