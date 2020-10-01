import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateRelationDto {
    @ApiProperty({ description: 'This is the unique title of the relation' })
    @IsNotEmpty()
    @IsString()
    readonly title: string
}