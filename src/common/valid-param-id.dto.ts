import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator'
export class ValidParamId { 
    @IsOptional()   
    @IsNotEmpty()
    @IsUUID()  id: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID()  companyId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID()  customerId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID()  connection_groupId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID()  market_potentialId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID()  customer_segmentId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID()  company_customer_segmentId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID()  relationId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID()  channelId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID()  customerProblemId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID()  conversationId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID()  risk_analysisId: string

    @IsNotEmpty()
    @IsOptional()
    @IsUUID()  customer_segmentation_typeId: string
    
    @IsNotEmpty()
    @IsOptional()
    @IsUUID()  segmentationId: string
}


