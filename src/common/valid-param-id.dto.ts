import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator'
export class ValidParamId { 
    @IsOptional()   
    @IsNotEmpty()
    @IsUUID() readonly id: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID() readonly companyId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID() readonly connection_groupId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID() readonly market_potentialId: string
}
