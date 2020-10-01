import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class CreateCompanyRelationDto {
    @ApiProperty({ description: 'This is the ID of the relation the company_relation belongs to' })
    @IsNotEmpty()
    @IsUUID()
    readonly relationsID: string
}