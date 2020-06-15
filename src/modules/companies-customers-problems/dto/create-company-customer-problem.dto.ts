import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateCustomerProblemsDto {

    @ApiProperty({ description: 'This is the title of the customer problem'})
    @IsNotEmpty()
    @IsString() readonly title: string

    @ApiProperty({ description: 'This is the description of the customer problem'})
    @IsNotEmpty()
    @IsString() readonly description: string
}
