export class CompanyTeamMembersInterface {
    id: string
    invite_email: string    
    invite_accepted: boolean
    user_id: string
    role_id: string
    company_id: string
    access_type_id: string
    created_at: Date
    updated_at: Date
}