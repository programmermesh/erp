export class RiskAnalysisInterface {
    id: string
    title: string
    type: string
    consequences: string
    likelihood: string
    description: string
    company_id: string
    created_at: Date
    updated_at?: Date
}