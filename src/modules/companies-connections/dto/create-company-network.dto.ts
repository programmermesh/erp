import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsUUID } from "class-validator";

export class CreateCompanyConnectionkDto {
    @ApiProperty({ description: 'This is the role that the company will have in the network' })
    @IsString()
    @IsNotEmpty()
    readonly role: string

    @ApiProperty({ description: 'This is the message that will be sent to a company ' })
    @IsString()
    @IsNotEmpty()
    readonly message: string

    @ApiProperty({ description: 'This is the ID of the company invited to be part of the company network to' })
    @IsNotEmpty()
    @IsUUID()
    readonly invited_company: string
}