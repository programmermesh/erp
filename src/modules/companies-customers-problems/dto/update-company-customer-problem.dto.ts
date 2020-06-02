import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, IsNotEmpty, IsString } from "class-validator"

export class UpdateCustomerProblemsDto {
    @ApiProperty({ description: 'This is the description of the customer problem'})
    @IsNotEmpty()
    @IsString()
    description: string
}