import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty } from "class-validator"

export class CreateConnectionGroupsDto {
    @ApiProperty({ description: 'This is the name of the group'})
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @ApiProperty({ description: 'This is the url for the group photo'})
    @IsString()
    @IsNotEmpty()
    readonly cover_photo: string
}