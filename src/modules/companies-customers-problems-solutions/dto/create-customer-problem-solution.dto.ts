import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateCustomerProblemsSolutionsDto {

    @ApiProperty({ description: 'This is the summary of the customer problem solutions'})
    @IsString()
    @IsNotEmpty()
    readonly description: string
}