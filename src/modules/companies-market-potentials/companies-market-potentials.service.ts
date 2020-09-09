import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { MarketPotentialEntity as MarketPotential } from './market-potential.entity'
import { CustomerEntity as Customer } from '../companies-customers/customer.entity'
import { MarketPotentialsCustomerEntity as MarketPotentialsCustomer } from '../companies-market-potential-customers/market-potentials-customer.entity'
import { PotentialsEstimateCoverageEntity as PotentialsEstimateCoverage } from '../companies-market-potential-estimates-coverage/potentials-estimate-coverage.entity'
import { CreateMarketPotentialDto } from './dto/create-market-potential.dto'
import { UpdateMarketPotentialDto } from './dto/update-market-potential.dto'

@Injectable()
export class CompaniesMarketPotentialsService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>,
        @InjectRepository(MarketPotential) private readonly companyMarketPotentialRepo: Repository<MarketPotential>,
        @InjectRepository(MarketPotentialsCustomer) private readonly marketPotentialsCustomerRepo: Repository<MarketPotentialsCustomer>,
        @InjectRepository(PotentialsEstimateCoverage) private readonly potentialsEstimateCoverageRepo: Repository<PotentialsEstimateCoverage>, 
    ){}
    private logger = new Logger('CompaniesMarketPotentialsService')
    private entity_prefix_name: string = 'Company Market Potential'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{
        const result = await this.companyMarketPotentialRepo.createQueryBuilder('market_potentials')
            .leftJoinAndSelect('market_potentials.market_potentials_customers', 'market_potentials_customers')
            .leftJoinAndSelect('market_potentials_customers.customers','customers')
            .leftJoin('customers.company','company')
            .where("company.created_by = :owner", {owner: user.id })
            .andWhere("company.id = :id", { id: params.companyId})
            .leftJoinAndSelect('market_potentials.potentials_estimate_coverages','potentials_estimate_coverages') 
            .orderBy('market_potentials.createdAt','DESC')            
            .getMany() 

        return { status: 'succcess', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const result = await this.findById(params, user)
        if(result){
            return { status: 'succcess', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateMarketPotentialDto): Promise<any>{
        const requestFound = await this.companyMarketPotentialRepo.findOne({ 
            where: { 
                title: newData.title,
                company:{
                    id: params.companyId,
                    created_by: user
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.title}' already exists`)
        }else{   
            try {    
                const newEntry = new MarketPotential()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.companyMarketPotentialRepo.merge(newEntry, saveThis)                   

                const result = await this.companyMarketPotentialRepo.save(newEntry) 
                
                ///SAVE THE CUSTOMERS
                if(newData.customers.length > 0){
                    for (let index = 0; index < newData.customers.length; index++) {
                        const element = newData.customers[index]
                        const marketCustomer = new MarketPotentialsCustomer()
                        marketCustomer.customers = await this.customerRepo.findOne({ where: { id: element.id } })
                        marketCustomer.market_potentials = result

                        await this.marketPotentialsCustomerRepo.save(marketCustomer)
                    }
                }

                // SAVE THE ESTIMATE COVERAGES
                if(newData.estimated_market_coverage.length > 0){
                    for (let index = 0; index < newData.estimated_market_coverage.length; index++) {
                        const element = newData.estimated_market_coverage[index]
                        const potentialEstimate = new PotentialsEstimateCoverage()
                        potentialEstimate.market_potentials = result
                        potentialEstimate.month = element.month
                        potentialEstimate.year = element.year
                        potentialEstimate.estimated_market_coverage = element.estimated_market_coverage

                        await this.potentialsEstimateCoverageRepo.save(potentialEstimate)
                    }
                }
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateMarketPotentialDto): Promise<any>{
        
        const requestFound = await this.findById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        try {
            this.companyMarketPotentialRepo.merge(requestFound, updateData)
            const result = await this.companyMarketPotentialRepo.save(requestFound)

            //DELETE THE EXISTING DATA
            await this.marketPotentialsCustomerRepo.createQueryBuilder('market_potentials_customers')
                    .where("market_potentials = :id", { id: result.id })
                    .delete()
                    .execute()

            ///SAVE THE CUSTOMERS
            if(updateData.customers.length > 0){
                for (let index = 0; index < updateData.customers.length; index++) {
                    const element = updateData.customers[index]
                    const marketCustomer = new MarketPotentialsCustomer()
                    marketCustomer.customers = await this.customerRepo.findOne({ where: { id: element.id } })
                    marketCustomer.market_potentials = result

                    await this.marketPotentialsCustomerRepo.save(marketCustomer)
                }
            }

            //DELETE THE EXISTING DATA
            await this.potentialsEstimateCoverageRepo.createQueryBuilder('potentials_estimate_coverage')
                    .where("market_potentials = :id", { id: result.id })
                    .delete()
                    .execute()

            // SAVE THE ESTIMATE COVERAGES
            if(updateData.estimated_market_coverage.length > 0){
                for (let index = 0; index < updateData.estimated_market_coverage.length; index++) {
                    const element = updateData.estimated_market_coverage[index]
                    const potentialEstimate = new PotentialsEstimateCoverage()
                    potentialEstimate.market_potentials = result
                    potentialEstimate.month = element.month
                    potentialEstimate.year = element.year
                    potentialEstimate.estimated_market_coverage = element.estimated_market_coverage

                    await this.potentialsEstimateCoverageRepo.save(potentialEstimate)
                }
            }
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
        const requestFound = await this.findById(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.companyMarketPotentialRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findById(params: ValidParamId, user: User){
        const requestFound = await this.companyMarketPotentialRepo.findOne({ 
            where: { 
                id: params.id,
                company: {
                    id: params.companyId,
                    //created_by: user
                }
            } 
        })
        return requestFound
    }
}
