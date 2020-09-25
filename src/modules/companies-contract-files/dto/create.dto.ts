import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateContractFileDto {

    @ApiProperty({ description: 'This is the url to the file'})
    @IsNotEmpty()
    @IsString()
    readonly contract_file_url: string
}