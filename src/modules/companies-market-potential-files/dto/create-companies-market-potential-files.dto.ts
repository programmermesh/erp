import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateMarketPotentialsFileDto {

    @ApiProperty({ description: 'This is the url to the file'})
    @IsNotEmpty()
    @IsString()
    readonly market_potential_file_url: string
}