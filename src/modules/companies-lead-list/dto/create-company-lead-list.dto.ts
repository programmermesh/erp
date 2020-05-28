import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsUUID } from "class-validator"

export class CreateLeadListDto {

    @ApiProperty({ description: 'This is the notes field associated to the lead'})
    @IsString()
    @IsNotEmpty()
    readonly notes: string
    
    @ApiProperty({ description: 'This is the id of the company the added to the lead list' })
    @IsNotEmpty()
    @IsUUID()
    readonly lead_company_id: string
}