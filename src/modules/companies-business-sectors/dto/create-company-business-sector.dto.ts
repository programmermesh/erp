import { IsNotEmpty,IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCompanyBusinessSectorDto {
    @ApiProperty({ description: 'This will be the ID of the business_sector the field is assigned to' })
    @IsUUID()
    @IsNotEmpty()
    readonly business_sector: string
}