export interface CompanyInterface {
    id: string
    name: string
    address: string
    country: string
    city: string
    email: string
    phone: string
    website: string
    company_size: number
    minimum_investment_amount?: number
    max_investment_amount?: number
    interested_in_investment?: boolean
    vision?: string
    mission?: string
    date_of_establishment?: string
    logo?: string
    profile_photo: string
    elevator_pitch?: string
    facebook?: string
    linkedin?: string
    twitter?: string
    youtube?: string
    others?: string
    min_valuation?: number
    max_valuation?: number
    valuation_description?: string
    company_type?: string
    create_at?: Date
    updated_at?: Date
    updated_by?: string
    created_by: string
}