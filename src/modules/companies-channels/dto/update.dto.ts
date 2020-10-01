import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsEnum, IsOptional } from "class-validator"
import { CHANNELS_PHASES } from '../../../common/enum_values'

export class UpdateCompanyChannelDto {
    @ApiProperty({ description: 'This is the title of the Channel'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly title: string

    @ApiProperty({ description: 'This is the description of the channel'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly description: string

    @ApiProperty({ description: 'This is the phase of the channel'})
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsEnum(CHANNELS_PHASES)
    readonly phase: CHANNELS_PHASES
}