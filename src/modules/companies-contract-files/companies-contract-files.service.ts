import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { FILETYPE } from '../../common/enum_values'
import { uploadImageToS3 } from '../../utils/s3UploadImages'
import { ContractFileEntity as ContractFile } from './contract-file.entity'
import { ContractEntity as Contract } from '../companies-contracts/contract.entity'

@Injectable()
export class CompaniesContractFilesService {
    constructor (
        @InjectRepository(ContractFile) private readonly contractFileRepo: Repository<ContractFile>,
        @InjectRepository(Contract) private readonly contractRepo: Repository<Contract> 
    ){}
    private logger = new Logger('CompaniesContractFilesService')
    private entity_prefix_name: string = 'Company Contract File'
    
    async getAll( params: ValidParamId, user: User ): Promise<ContractFile[]>{
        return await this.contractFileRepo.find({
            where: {
                contract: {
                    id: params.contractId,
                    company: {
                        id: params.companyId
                    }
                }                
            },            
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findById(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async uploadFile(params: ValidParamId, file: any, fileType: FILETYPE, user: User): Promise<any>{
        const requestFound = await this.contractRepo.findOne({ 
            where: { 
                id: params.contractId,
                company:{
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })
        if(!requestFound){
            throw new NotFoundException(`Contract with ID ${params.contractId} does not exists`)
        }else{   
            try {    
                const urlKey = `contract_files/${params.companyId}/${Date.now().toString()}-${file.originalname}`
        
                const data = await uploadImageToS3(
                    params,
                    file,
                    urlKey
                )
                if(data.success){
                    //save the the market potential table
                    const newFile = new ContractFile()
                    newFile.contract_file_url = data.url
                    newFile.contract = requestFound
                    newFile.name = file.originalname
                    const result = await this.contractFileRepo.save(newFile)
                    return Promise.resolve({
                        status: 'success',
                        result
                    }) 
                }
                
            } catch(error){
                this.logger.error(error.message, error.stack)
                throw new InternalServerErrorException()
            }
        }
        
    }

    async delete(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findById(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.contractFileRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findById(params: ValidParamId, user: User){
        const requestFound = await this.contractFileRepo.findOne({ 
            where: { 
                id: params.id,
                contract: {
                    id: params.contractId,
                    company: {
                        id: params.companyId
                    }
                } 
            } 
        })
        return requestFound
    }
}


