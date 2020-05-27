import { IsNotEmpty,IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCompanyBusinessStageDto {
    @ApiProperty({ description: 'This will be the ID of the business_stage the field is assigned to' })
    @IsUUID()
    @IsNotEmpty()
    readonly business_stage_id: string
}