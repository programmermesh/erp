import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class CreateMarketPotentialsCustomerDto {
    /* Many market_potentials_customers can belong to one market potential entity */
    @ApiProperty({ description: 'This is the ID of the market potential entity'})
    @IsNotEmpty()
    @IsUUID()
    readonly market_potentialsId: string

    /* Many market_potentials_customers can belong to one customer entity */
    @ApiProperty({ description: 'This is the ID of the customer entity'})
    @IsNotEmpty()
    @IsUUID()
    readonly customersId: string
}