import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsUUID } from "class-validator"

export class UpdateLeadListDto {
    @ApiProperty({ description: 'This is the notes field associated to the lead'})
    @IsString()
    @IsNotEmpty()
    readonly notes: string
}