import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateMarketPotentialsFileDto {

    @ApiProperty({ description: 'This is the name of the file'})
    @IsNotEmpty()
    @IsString()
    readonly filename: string

    @ApiProperty({ description: 'This is the name of the url to the file'})
    @IsNotEmpty()
    @IsString()
    readonly fileurl: string
    
    @ApiProperty({ description: 'This is the ID of the market potential entity'})
    @IsUUID()
    @IsNotEmpty()
    market_potentialsId: string
}