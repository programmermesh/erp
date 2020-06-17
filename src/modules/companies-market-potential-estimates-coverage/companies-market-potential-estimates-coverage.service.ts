import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { PotentialsEstimateCoverageEntity as PotentialsEstimateCoverage } from './potentials-estimate-coverage.entity'
import { MarketPotentialEntity as MarketPotential } from '../companies-market-potentials/market-potential.entity'
import { CreateMarketPotentialsEstimateCoverageDto } from './dto/create-market-potential-estimate-coverage.dto'
import { UpdateMarketPotentialsEstimateCoverageDto } from './dto/update-market-potential-estimate-coverage.dto'

@Injectable()
export class CompaniesMarketPotentialEstimatesCoverageService {
   constructor(
    @InjectRepository(PotentialsEstimateCoverage) private readonly potentialsEstimateCoverageRepo: Repository<PotentialsEstimateCoverage>,
    @InjectRepository(MarketPotential) private readonly marketPotentialRepo: Repository<MarketPotential>
   ){}

   private logger = new Logger('CompaniesMarketPotentialEstimatesCoverageService')
   private entity_prefix_name: string = 'Company Market Potential Estimates Coverage'
   
   async getAll( params: ValidParamId, user: User ): Promise<PotentialsEstimateCoverage[]>{
       return await this.potentialsEstimateCoverageRepo.find({
           where: {
               market_potentials: {
                   id: params.market_potentialId,
                   company:{
                        id: params.companyId,
                        created_by: user
                    }
               }               
           },            
           order: {
               createdAt: 'DESC'
           }
       });
   }

   async getById(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findCompanyPotentialsEstimateCoverageId(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateMarketPotentialsEstimateCoverageDto): Promise<any>{
        const requestFound = await this.marketPotentialRepo.findOne({ 
            where: { 
                id: params.market_potentialId,
                company:{
                    id: params.companyId,
                    created_by: user
                }
            } 
        })
        if(!requestFound){
            throw new NotFoundException(`Market Potential with ID ${params.market_potentialId} already exists`)
        }else{   
            try {    
                const newEntry = new PotentialsEstimateCoverage()
                const saveThis = {
                    ...newData,
                    market_potentials: requestFound
                }
                
                this.potentialsEstimateCoverageRepo.merge(newEntry, saveThis)
                const result = await this.potentialsEstimateCoverageRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateMarketPotentialsEstimateCoverageDto): Promise<any>{
        
        const requestFound = await this.findCompanyPotentialsEstimateCoverageId(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.potentialsEstimateCoverageRepo.merge(requestFound, updateData)
            const result = await this.potentialsEstimateCoverageRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }

    async delete(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findCompanyPotentialsEstimateCoverageId(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.potentialsEstimateCoverageRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCompanyPotentialsEstimateCoverageId(params: ValidParamId, user: User){
        const requestFound = await this.potentialsEstimateCoverageRepo.findOne({ 
            where: {
                id: params.id,
                market_potentials: {
                    id: params.market_potentialId,
                    company:{
                         id: params.companyId,
                         created_by: user
                     }
                }               
            } 
        })
        return requestFound
    }

}
