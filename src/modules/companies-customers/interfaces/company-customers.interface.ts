export interface CompanyCustomerInterface {
    id: string 
    title: string
    minimum_age: number
    maximum_age: number
    sex: string
    relationship_status: string
    occupation: string
    color_code: string
    general_description: string
    created_at: Date
    updated_at?: Date
    education_stageId: string
    income_bracketId: string
    company_customer_segmentId: string
}