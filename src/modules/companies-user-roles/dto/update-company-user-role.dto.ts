import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCompanyUserRoleDto {
    @ApiProperty({ description: "This is the name(update) of the user role" })
    @IsNotEmpty()
    @IsString() readonly name: string
}