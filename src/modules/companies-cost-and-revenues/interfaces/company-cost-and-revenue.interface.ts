import { COST_OR_REVENUE } from '../../../common/enum_values'

export interface CompanyCostAndRevenuesInterface {
    id: string 
    title: string
    description: string
    estimated_cost: number
    type: COST_OR_REVENUE
    company_id: string
    created_at: Date
    updated_at: Date
}