
import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { PerformanceIndicatorCostEntity as  PerformanceIndicatorCost} from './cost.entity'
import { PerformanceIndicatorRevenueEntity as PerformanceIndicatorRevenue} from '../companies-performance-indicator-revenue/revenue.entity'
import { PerformanceIndicatorCustomerEntity as PerformanceIndicatorCustomer} from '../companies-performance-indicator-customers/customer.entity'
import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateDto } from './dto/create.dto'
import { SearchDto } from './dto/searchDto';

@Injectable()
export class CompaniesPerformanceIndicatorCostService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(PerformanceIndicatorCost) private readonly performanceIndicatorCostRepo: Repository<PerformanceIndicatorCost>,
        @InjectRepository(PerformanceIndicatorRevenue) private readonly performanceIndicatorRevenueRepo: Repository<PerformanceIndicatorRevenue>,
        @InjectRepository(PerformanceIndicatorCustomer) private readonly performanceIndicatorCustomerRepo: Repository<PerformanceIndicatorCustomer>,  
    ){}
    private logger = new Logger('CompaniesPerformanceIndicatorCostService')
    private entity_prefix_name: string = 'Performance Indicator Cost'
    
    async getAll( params: ValidParamId, user: User, searchDto: SearchDto ): Promise<any>{
        
        let query = this.performanceIndicatorCostRepo.createQueryBuilder('performance_indicator_cost')
        .leftJoin('performance_indicator_cost.company', 'company')
        .where('company.id = :id', { id: params.companyId })
        .orderBy('performance_indicator_cost.date_only', 'ASC')

        if(searchDto.from){
            const queryParams = {
                from: new Date(`${searchDto.from}-01`),
                to: new Date(`${searchDto.to}-01`)
            }
    
            query.andWhere( `"performance_indicator_cost"."date_only" BETWEEN :begin AND :end` ,{ begin: queryParams.from, end: queryParams.to })
        }
        const result = await query.getMany()

        return { status: 'success', result }
    }

    async getChartData( params: ValidParamId, user: User, searchDto: SearchDto ): Promise<any>{
        
        /*COSTS DATA*/
        let query = this.performanceIndicatorCostRepo.createQueryBuilder('performance_indicator_cost')
        .leftJoin('performance_indicator_cost.company', 'company')
        .where('company.id = :id', { id: params.companyId })
        .orderBy('performance_indicator_cost.date_only', 'ASC')

        if(searchDto.from){
            const queryParams = {
                from: new Date(`${searchDto.from}-01`),
                to: new Date(`${searchDto.to}-01`)
            }
    
            query.andWhere( `"performance_indicator_cost"."date_only" BETWEEN :begin AND :end` ,{ begin: queryParams.from, end: queryParams.to })
        }
        const costsData = await query.getMany()

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

        const months_string = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const monthsArray = costsData.map(item => {
            return months_string[new Date(item.date_only).getMonth()] + `(${new Date(item.date_only).getFullYear()})`
        })
        const grossBurnRate = costsData.map(item => { return item.this_month})
        const totalGrossBurnRate = grossBurnRate.reduce(((acc, val) => acc+val),0)
        const nettBurnRate = costsData.map(item => {
            const revenue_this_month_data = revenueData.find(el => el.date_only === item.date_only)
            const total_revenue = revenue_this_month_data ? revenue_this_month_data.this_month : 0 // Get the revenue for that month else equals zero
            return (item.this_month - total_revenue)
        })
        const totalNettBurnRate = nettBurnRate.reduce((acc, val) => acc+val,0)
        const averageGrossBurnRate = costsData.map(item => {
            return Math.ceil((item.this_month+item.last_month)/(monthsArray.length+1))
        })
        const meanAverageGrossBurnRate = averageGrossBurnRate.length ? (averageGrossBurnRate.reduce( (acc, val) => acc+val,0))/averageGrossBurnRate.length : 0
        const runAwayArray = costsData.map(item => {
            const revenue_this_month_data = revenueData.find(el => el.date_only === item.date_only)
            const total_revenue = revenue_this_month_data ? revenue_this_month_data.this_month : 0 // Get the revenue for that month else equals zero
            const reserve_money = revenue_this_month_data ? revenue_this_month_data.reserve_from_previous_period : 0 // Get the revenue for that month else equals zero
            return Math.ceil(((reserve_money + total_revenue)-item.this_month)/item.last_month)
        })
        const runAway = runAwayArray.reduce((acc,val) => acc+val, 0)
        const cacArray = costsData.map(item => {
            const customer_this_month_data = customersData.find(el => el.date_only === item.date_only)
            const total_revenue = customer_this_month_data ? customer_this_month_data.acquired_customers : 0 // Get the data for that month else equals zero
            return total_revenue > 0 ? (item.market_expenses/total_revenue) : 0
        })

        const CAC = (cacArray.reduce((acc,val) => acc+val, 0)).toFixed(2)

        const summaryData = [
            { title: 'Gross Burn Rate', value: totalGrossBurnRate, symbol: '$' },
            { title: 'Nett Burn Rate', value: totalNettBurnRate, symbol: '$' },
            { title: 'Average Gross Burn Rate', value: meanAverageGrossBurnRate, symbol: '$' },
            { title: 'Runaway', value: runAway, symbol: '' },
            { title: 'CAC', value: CAC, symbol: '' }
        ]

        const result = {
            monthsArray,
            grossBurnRate,
            totalGrossBurnRate,
            totalNettBurnRate,
            nettBurnRate,
            averageGrossBurnRate,
            runAway,
            CAC,
            summaryData
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

    async create(params: ValidParamId, user: User, newData: CreateDto): Promise<any>{
        const requestFound = await this.performanceIndicatorCostRepo.findOne({ 
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
                const newEntry = new PerformanceIndicatorCost()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.performanceIndicatorCostRepo.merge(newEntry, saveThis)                   

                const result = await this.performanceIndicatorCostRepo.save(newEntry)                
                
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

    /*
    async update(params: ValidParamId, user: User, updateData: CreateDto): Promise<any>{
        
        const requestFound = await this.findById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        try {
            this.performanceIndicatorRevenueRepo.merge(requestFound, updateData)
            const result = await this.performanceIndicatorRevenueRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }    */

    async delete(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.performanceIndicatorCostRepo.findOne({ 
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

        const result = await this.performanceIndicatorCostRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findById(params: ValidParamId, user: User){
        const requestFound = await this.performanceIndicatorCostRepo.findOne({ 
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


