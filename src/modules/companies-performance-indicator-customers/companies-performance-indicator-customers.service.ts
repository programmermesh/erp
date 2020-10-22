import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { PerformanceIndicatorCustomerEntity as PerformanceIndicatorCustomer } from './customer.entity'
import { PerformanceIndicatorRevenueEntity as PerformanceIndicatorRevenue} from '../companies-performance-indicator-revenue/revenue.entity'
import { PerformanceIndicatorCostEntity as PerformanceIndicatorCost} from '../companies-performance-indicator-cost/cost.entity'
import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateCustomersDto } from './dto/create.dto'
import { UpdateCustomersDto } from './dto/update.dto'
import { SearchDto } from './dto/searchDto'

@Injectable()
export class CompaniesPerformanceIndicatorCustomersService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(PerformanceIndicatorRevenue) private readonly performanceIndicatorRevenueRepo: Repository<PerformanceIndicatorRevenue>,
        @InjectRepository(PerformanceIndicatorCost) private readonly performanceIndicatorCostRepo: Repository<PerformanceIndicatorCost>,
        @InjectRepository(PerformanceIndicatorCustomer) private readonly performanceIndicatorCustomerRepo: Repository<PerformanceIndicatorCustomer> 
    ){}
    private logger = new Logger('CompaniesPerformanceIndicatorCustomersService')
    private entity_prefix_name: string = 'Performance Indicator Customer'
    
    async getAll( params: ValidParamId, user: User, searchDto: SearchDto ): Promise<any>{
        
        let query = this.performanceIndicatorCustomerRepo.createQueryBuilder('performance_indicator_customers')
        .leftJoin('performance_indicator_customers.company', 'company')
        .where('company.id = :id', { id: params.companyId })
        .orderBy('performance_indicator_customers.date_only', 'ASC')

        if(searchDto.from){
            const queryParams = {
                from: new Date(`${searchDto.from}-01`),
                to: new Date(`${searchDto.to}-01`)
            }
    
            query.andWhere( `"performance_indicator_customers"."date_only" BETWEEN :begin AND :end` ,{ begin: queryParams.from, end: queryParams.to })
        }
        const result = await query.getMany()


        return { status: 'success', result }
    }

    async getChartData( params: ValidParamId, user: User, searchDto: SearchDto ): Promise<any>{        
        
        /*CUSTOMERS DATA*/
        let queryCustomers = this.performanceIndicatorCustomerRepo.createQueryBuilder('performance_indicator_customers')
        .leftJoin('performance_indicator_customers.company', 'company')
        .where('company.id = :id', { id: params.companyId })
        .orderBy('performance_indicator_customers.date_only', 'ASC')

        if(searchDto.from){
            const queryParams = {
                from: new Date(`${searchDto.from}-01`),
                to: new Date(`${searchDto.to}-01`)
            }
    
            queryCustomers.andWhere( `"performance_indicator_customers"."date_only" BETWEEN :begin AND :end` ,{ begin: queryParams.from, end: queryParams.to })
        }
        const customersData = await queryCustomers.getMany()

        /*REVENUE DATA*/
        let queryRevenue = this.performanceIndicatorRevenueRepo.createQueryBuilder('performance_indicator_revenue')
        .leftJoin('performance_indicator_revenue.company', 'company')
        .where('company.id = :id', { id: params.companyId })
        .orderBy('performance_indicator_revenue.date_only', 'ASC')

        if(searchDto.from){
            const queryParams = {
                from: new Date(`${searchDto.from}-01`),
                to: new Date(`${searchDto.to}-01`)
            }
    
            queryRevenue.andWhere( `"performance_indicator_revenue"."date_only" BETWEEN :begin AND :end` ,{ begin: queryParams.from, end: queryParams.to })
        }
        const revenueData = await queryRevenue.getMany()

        /*COSTS DATA*/
        let queryCost = this.performanceIndicatorCostRepo.createQueryBuilder('performance_indicator_cost')
        .leftJoin('performance_indicator_cost.company', 'company')
        .where('company.id = :id', { id: params.companyId })
        .orderBy('performance_indicator_cost.date_only', 'ASC')

        if(searchDto.from){
            const queryParams = {
                from: new Date(`${searchDto.from}-01`),
                to: new Date(`${searchDto.to}-01`)
            }
    
            queryCost.andWhere( `"performance_indicator_cost"."date_only" BETWEEN :begin AND :end` ,{ begin: queryParams.from, end: queryParams.to })
        }
        const costsData = await queryCost.getMany()

        //GET THE COMPUTED DATA AND RETURN

        const months_string = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        //const months = customersData.map(item => months_string[new Date(item.date_only).getMonth()])
        const months = customersData.map(item => {
            return months_string[new Date(item.date_only).getMonth()] + `(${new Date(item.date_only).getFullYear()})`
        })
        const customersLostArray = customersData.map(item => (
            (item.last_month + item.acquired_customers) - item.this_month
        ))
        const totalCustomersArray = customersData.map(item => {return item.this_month})
        const totalCustomersLost = customersLostArray.reduce(function (acc, val) { return acc + val }, 0)
        const percentageIncreaseOfCustomers = customersData.reduce((acc, val) => {
            return Math.ceil((val.this_month - val.last_month) * 100 / val.last_month)
        }, 0)
        const churnArray = customersData.map(item => (
            Math.ceil(((item.last_month + item.acquired_customers) - item.this_month) * 100 / item.last_month)
        ))
        const totalChurns = Math.ceil((churnArray.reduce(function (acc, val) { return acc + val }, 0)) / churnArray.length)
        const ARPU_array = customersData.map(item => {
            const singleRevenueData = revenueData.find(el => el.date_only === item.date_only)
            const generatedRevenue = singleRevenueData ? singleRevenueData.generated_revenue : 0
            return generatedRevenue ? Math.ceil(generatedRevenue/item.this_month) : 0
        }) 
        const ARPU = ARPU_array.reduce((acc,val) => acc+val,0) // customer_generated_revenue/number_of_customers_this_month
        const changesInARPU_Array = ARPU_array.map((item,index) => {
            const next_period = ARPU_array[index+1] ? ARPU_array[index+1] : 0 //IF we do not have the next value then we return 0
            return Math.ceil((next_period - item)/item)
        })
        const changesInARPU = changesInARPU_Array.reduce((acc, val) => acc+val,0)
        const cacArray = costsData.map(item => {
            const customer_this_month_data = customersData.find(el => el.date_only === item.date_only)
            const total_revenue = customer_this_month_data ? customer_this_month_data.acquired_customers : 0 // Get the data for that month else equals zero
            return total_revenue > 0 ? (item.market_expenses/total_revenue) : 0
        })

        const CAC = (cacArray.reduce((acc,val) => acc+val, 0)).toFixed(2)

        const sideSummaryData = [
            { title: 'Customers Lost', value: totalCustomersLost > 0 ? totalCustomersLost : totalCustomersLost, symbol: '' },
            { title: 'Increase of customers', value: percentageIncreaseOfCustomers, symbol: '%' },
            { title: 'Churn', value: isNaN(totalChurns) ? 0 : totalChurns, symbol: '%' },
            { title: 'ARPU', value: ARPU, symbol: '' },
            { title: 'Change in ARPU', value: changesInARPU, symbol: '%' },
            { title: 'CAC', value: CAC , symbol: '' }
          ]

        const result = {
            totalCustomersArray,
            totalCustomers: totalCustomersArray.length ? totalCustomersArray[totalCustomersArray.length - 1] : 0,
            customersLostArray,
            months,
            totalCustomersLost: totalCustomersLost > 0 ? totalCustomersLost : 0,
            percentageIncreaseOfCustomers,
            churnArray,
            totalChurns: isNaN(totalChurns) ? 0 : totalChurns,
            ARPU_array,
            ARPU,
            changesInARPU,
            changesInARPU_Array,
            CAC,
            sideSummaryData
        }

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

    async create(params: ValidParamId, user: User, newData: CreateCustomersDto): Promise<any>{
        const requestFound = await this.performanceIndicatorCustomerRepo.findOne({ 
            where: { 
                date_only: newData.date_only,
                company:{
                    id: params.companyId
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`Entry for that date already exists`)
        }else{   
            try {    
                const newEntry = new PerformanceIndicatorCustomer()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.performanceIndicatorCustomerRepo.merge(newEntry, saveThis)                   

                const result = await this.performanceIndicatorCustomerRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCustomersDto): Promise<any>{
        
        const requestFound = await this.findById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        try {
            this.performanceIndicatorCustomerRepo.merge(requestFound, updateData)
            const result = await this.performanceIndicatorCustomerRepo.save(requestFound)
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
        const requestFound = await this.performanceIndicatorCustomerRepo.findOne({ 
            where: { 
                id: params.id,
                company: {
                    id: params.companyId
                }
            } 
        })

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.performanceIndicatorCustomerRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findById(params: ValidParamId, user: User){
        const requestFound = await this.performanceIndicatorCustomerRepo.findOne({ 
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

