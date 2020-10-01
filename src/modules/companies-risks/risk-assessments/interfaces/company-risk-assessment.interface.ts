import { RISK_ASSESSTMENT_TYPE } from '../../../../common/enum_values'

export interface RiskAssessmentInterface {
    id: string   
    title: string
    description: string
    type: RISK_ASSESSTMENT_TYPE
    company_id: string 
    created_at: Date 
    updated_at: Date
}