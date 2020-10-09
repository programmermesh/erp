import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray } from "class-validator"
import { COMPETITORS_IMPORTANCE_LEVEL } from '../../../common/enum_values'

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
    @IsOptional()
    @ApiPropertyOptional()
    readonly point_of_differentiation: string

    @ApiProperty({ description: 'This is the details about the competitor '})
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly details: string

    @ApiProperty({ description: 'This is the importance level of the competitor', enum: COMPETITORS_IMPORTANCE_LEVEL})
    @IsEnum(COMPETITORS_IMPORTANCE_LEVEL)
    @IsOptional()
    @ApiPropertyOptional()
    readonly importance_level: COMPETITORS_IMPORTANCE_LEVEL

    @ApiProperty({ description: 'This is the link or website url'})
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly website: string

    @ApiProperty({ description: 'This is the revenue stream [One-time revenue , recurring revenue]'})
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly revenue_stream: string

    @ApiProperty({ description: 'These are the different prices'})
    @IsArray()
    @IsOptional()
    @ApiPropertyOptional()
    readonly price: string[]

    @ApiProperty({ description: 'These are the different value_propositions'})
    @IsArray()
    @IsOptional()
    @ApiPropertyOptional()
    readonly value_proposition: string[]

    @ApiProperty({ description: 'This is the customer experience'})
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly customer_experience: string
    /*
    @Column('varchar', { nullable: true })
    revenue_stream: string

    @Column("text", { array: true, default: [] })
    price: string[];

    @Column('varchar', { default: '' })
    customer_experience: string

    @Column("text", { array: true, default: [] })
    value_proposition: string[];
    */
}