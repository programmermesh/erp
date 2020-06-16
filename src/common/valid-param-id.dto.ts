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
    @IsUUID() readonly customerId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID() readonly connection_groupId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID() readonly market_potentialId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID() readonly customer_segmentId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID() readonly relationId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID() readonly channelId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID() readonly customerProblemId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID() readonly conversationId: string
}
