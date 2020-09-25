import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { FILETYPE } from '../../common/enum_values'
import { uploadImageToS3 } from '../../utils/s3UploadImages'
import { ContractEntity as CompanyContract } from './contract.entity'
import { CreateCompanyContractDto } from './dto/create.dto'
import { UpdateCompanyContractDto } from './dto/update.dto'

@Injectable()
export class CompaniesContractsService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(CompanyContract) private readonly companyContractRepo: Repository<CompanyContract> 
    ){}
    private logger = new Logger('CompaniesContractsService')
    private entity_prefix_name: string = 'Company Contract'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{
        const result = await this.companyContractRepo.find({
            where: {
                company:{
                    id: params.companyId
                }
            },            
            order: {
                createdAt: 'DESC'
            },
            relations: ['contract_files']
        });
        return { status: 'success', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const result = await this.findById(params, user)
        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyContractDto): Promise<any>{
        const requestFound = await this.companyContractRepo.findOne({ 
            where: { 
                title: newData.title,
                company:{
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.title}' already exists`)
        }else{   
            try {    
                const newEntry = new CompanyContract()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.companyContractRepo.merge(newEntry, saveThis)                   

                const result = await this.companyContractRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCompanyContractDto): Promise<any>{
        
        const requestFound = await this.findById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.companyContractRepo.merge(requestFound, updateData)
            const result = await this.companyContractRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }
    async uploadCoverPhoto(params: ValidParamId, user: User, file:any, filetype: FILETYPE){
        const requestFound = await this.findById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        const urlKey = `${filetype}/${params.companyId}/${Date.now().toString()}-${file.originalname}`
        
        const data = await uploadImageToS3(
            params,
            file,
            urlKey
        )
        if(data.success){
            //update the pitch deck
            requestFound.contract_image = data.url
            const updateImage = await this.companyContractRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result: updateImage
            }) 
        }
    }
    

    async delete(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.companyContractRepo.findOne({ 
            where: { 
                id: params.id,
                company: {
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.companyContractRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findById(params: ValidParamId, user: User){
        const requestFound = await this.companyContractRepo.findOne({ 
            where: { 
                id: params.id,
                company: {
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })
        return requestFound
    }
}
