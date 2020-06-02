import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, IsNotEmpty, IsString } from "class-validator"

export class CreateCustomerProblemsSolutionsDto {

    @ApiProperty({ description: 'This is the id of the prolem the entry is associated to' })
    @IsUUID()
    @IsNotEmpty()
    readonly custom_problems: string

    @ApiProperty({ description: 'This is the summary of the customer problem solutions'})
    @IsString()
    @IsNotEmpty()
    readonly description: string
}