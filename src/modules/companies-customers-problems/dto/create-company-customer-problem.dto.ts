import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, IsNotEmpty, IsString } from "class-validator"

export class CreateCustomerProblemsDto {
    /* Many problems can be related to ONE customer */
    @ApiProperty({ description: 'This is the id of the customer the entry is associated to' })
    @IsUUID()
    @IsNotEmpty()
    readonly customer: string

    @ApiProperty({ description: 'This is the description of the customer problem'})
    @IsNotEmpty()
    @IsString()
    description: string
}