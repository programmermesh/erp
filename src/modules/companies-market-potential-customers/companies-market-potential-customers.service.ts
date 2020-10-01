import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { CreateMarketPotentialsCustomerDto } from './dto/create-martket-potential-customer.dto'
import { MarketPotentialsCustomerEntity as MarketPotentialsCustomer } from './market-potentials-customer.entity'
import { MarketPotentialEntity as MarketPotential } from '../companies-market-potentials/market-potential.entity'
import { CustomerEntity as Customer } from '../companies-customers/customer.entity'
@Injectable()
export class CompaniesMarketPotentialCustomersService {
    constructor(
        @InjectRepository(MarketPotentialsCustomer) private readonly marketPotentialsCustomerRepo: Repository<MarketPotentialsCustomer>,
        @InjectRepository(MarketPotential) private readonly marketPotentialRepo: Repository<MarketPotential>,
        @InjectRepository(Customer) private readonly customerRepo: Repository<Customer>
       ){}
    
       private logger = new Logger('CompaniesMarketPotentialCustomersService')
       private entity_prefix_name: string = 'Company Market Potential Customer'
       
       async getAll( params: ValidParamId, user: User ): Promise<MarketPotentialsCustomer[]>{
           return await this.marketPotentialsCustomerRepo.find({
               where: {
                   market_potentials: {
                       id: params.market_potentialId,
                       company: {
                           id: params.companyId,
                           // created_by: user
                       }
                   }                                  
               },
               relations:['customers'],            
               order: {
                   createdAt: 'DESC'
               }
           });
       }

       async getById(params: ValidParamId, user: User): Promise<MarketPotentialsCustomer>{
            const requestFound = await this.findCompanyPotentialsCustomerId(params, user)
            if(requestFound){
                return requestFound
            }else{
                throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
            } 
        }
    
        async create(params: ValidParamId, user: User, newData: CreateMarketPotentialsCustomerDto): Promise<any>{
            const requestFound = await this.marketPotentialsCustomerRepo.findOne({ 
                where: { 
                    market_potentials: {
                        id: params.market_potentialId,
                        company: {
                            id: params.companyId,
                            // created_by: user
                        }
                    },
                    customers: newData.customersId
                }
            })
            //return requestFound
            if(requestFound){
                throw new NotFoundException(`${this.entity_prefix_name} with customer ID ${params.market_potentialId} already exists`)
            }else{   
                try {    
                    const newEntry = new MarketPotentialsCustomer()
                    newEntry.market_potentials = await this.marketPotentialRepo.findOne(params.market_potentialId)
                    newEntry.customers = await this.customerRepo.findOne(newData.customersId)
                    
                    const result = await this.marketPotentialsCustomerRepo.save(newEntry)                
                    
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
            const requestFound = await this.findCompanyPotentialsCustomerId(params,user)
    
            if(!requestFound){
                throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
            }
            
            const result = await this.marketPotentialsCustomerRepo.delete(params.id)
            if(result.affected === 0){
                throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
            }
    
            return Promise.resolve({
                result,
                status: 'success'
            })
        }
    
        private async findCompanyPotentialsCustomerId(params: ValidParamId, user: User){
            const requestFound = await this.marketPotentialsCustomerRepo.findOne({ 
                where: {
                    id: params.id,
                    market_potentials: {
                        id: params.market_potentialId,
                        company:{
                             id: params.companyId,
                             // created_by: user
                         }
                    }               
                },
                relations: ['customers'] 
            })
            return requestFound
        }
    
}
