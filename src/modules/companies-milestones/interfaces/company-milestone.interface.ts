import { MONTHS_OF_THE_YEAR } from '../../../common/enum_values'
export interface CompanyMilestonesEntity {
    id: string
    title: string
    description: string
    month: MONTHS_OF_THE_YEAR
    year: number
    milestone_archived: boolean
    company_id: string
    created_at: Date
    updated_at?: Date
}