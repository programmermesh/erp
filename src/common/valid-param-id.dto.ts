import { IsUUID, IsNotEmpty } from 'class-validator'
export class ValidParamId {    
    @IsNotEmpty()
    @IsUUID() readonly id: string
}

export class ValidParamCompanyId {
    @IsNotEmpty()
    @IsUUID() readonly companyId: string
}

