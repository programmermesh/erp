import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsUUID, IsOptional } from "class-validator"

export class CreateLeadListDto {

    @ApiProperty({ description: 'This is the notes field associated to the lead'})
    @IsString()
    @IsNotEmpty()
    readonly notes: string
    
    @ApiProperty({ description: 'This is the id of the company the added to the lead list' })
    @IsNotEmpty()
    @IsUUID()    
    readonly added_lead_company: string
}