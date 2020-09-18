import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { FILETYPE } from '../../common/enum_values'
import { uploadImageToS3 } from '../../utils/s3UploadImages'
import { MarketPotentialsFileEntity as MarketPotentialsFile } from './market-potentials-file.entity'
import { MarketPotentialEntity as MarketPotential } from '../companies-market-potentials/market-potential.entity'

@Injectable()
export class CompaniesMarketPotentialFilesService {
    constructor (
        @InjectRepository(MarketPotentialsFile) private readonly marketPotentialsFileRepo: Repository<MarketPotentialsFile>,
        @InjectRepository(MarketPotential) private readonly companyMarketPotentialRepo: Repository<MarketPotential> 
    ){}
    private logger = new Logger('CompaniesMarketPotentialFilesService')
    private entity_prefix_name: string = 'Company Market Potential File'
    
    async getAll( params: ValidParamId, user: User ): Promise<MarketPotentialsFile[]>{
        return await this.marketPotentialsFileRepo.find({
            where: {
                market_potentials: {
                    id: params.market_potentialId,
                    company: {
                        id: params.companyId,
                        // user: user
                    }
                }                
            },            
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findCompanyMarketPotentialsFileById(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async uploadFile(params: ValidParamId, file: any, fileType: FILETYPE, user: User): Promise<any>{
        const requestFound = await this.companyMarketPotentialRepo.findOne({ 
            where: { 
                id: params.market_potentialId,
                company:{
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })
        if(!requestFound){
            throw new NotFoundException(`Market Potential with ID ${params.market_potentialId} does not exists`)
        }else{   
            try {    
                const urlKey = `market_potentials_files/${params.companyId}/${Date.now().toString()}-${file.originalname}`
        
                const data = await uploadImageToS3(
                    params,
                    file,
                    urlKey
                )
                if(data.success){
                    //save the the market potential table
                    const newMarketPotentialFile = new MarketPotentialsFile()
                    newMarketPotentialFile.market_potential_file_url = data.url
                    newMarketPotentialFile.market_potentials = requestFound
                    newMarketPotentialFile.name = file.originalname
                    const result = await this.marketPotentialsFileRepo.save(newMarketPotentialFile)
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
        const requestFound = await this.findCompanyMarketPotentialsFileById(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.marketPotentialsFileRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCompanyMarketPotentialsFileById(params: ValidParamId, user: User){
        const requestFound = await this.marketPotentialsFileRepo.findOne({ 
            where: { 
                id: params.id,
                market_potentials: {
                    id: params.market_potentialId,
                    company: {
                        id: params.companyId,
                        user: user
                    }
                } 
            } 
        })
        return requestFound
    }
}
