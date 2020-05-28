import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty } from "class-validator"

export class CreateCompanyCompetitorDto {

    @ApiProperty({ description: 'This is name of the competitor'})
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @ApiProperty({ description: 'This is the type of competitor'})
    @IsString()
    @IsNotEmpty()
    readonly type: string

    @ApiProperty({ description: 'This is the point of differentiation'})
    @IsString()
    @IsNotEmpty()
    readonly point_of_differentiation: string

    @ApiProperty({ description: 'This is the details about the competitor '})
    @IsString()
    @IsNotEmpty()
    readonly details: string

    @ApiProperty({ description: 'This is the importance level of the competitor'})
    @IsString()
    @IsNotEmpty()
    readonly importance_level: string

    @ApiProperty({ description: 'This is the link or website url'})
    @IsString()
    @IsNotEmpty()
    readonly website: string
}