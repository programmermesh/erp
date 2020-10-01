import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class CreateCompanyChannelRelationshipDto {
    @ApiProperty({ description: 'This is the customer ID'})
    @IsUUID()
    @IsNotEmpty()
    readonly customer_id: string
}