import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsEnum } from "class-validator"
import { CHANNELS_PHASES } from '../../../common/enum_values'

export class CreateCompanyChannelDto {
    @ApiProperty({ description: 'This is the title of the Channel'})
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({ description: 'This is the description of the channel'})
    @IsString()
    @IsNotEmpty()
    readonly description: string

    @ApiProperty({ description: 'This is the phase of the channel'})
    @IsNotEmpty()
    @IsEnum(CHANNELS_PHASES)
    readonly phase: CHANNELS_PHASES
}