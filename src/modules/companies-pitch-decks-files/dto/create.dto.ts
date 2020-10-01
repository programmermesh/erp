import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreatePitchDeckFileDto {

    @ApiProperty({ description: 'This is the url to the file'})
    @IsNotEmpty()
    @IsString()
    readonly pitch_deck_file_url: string
}