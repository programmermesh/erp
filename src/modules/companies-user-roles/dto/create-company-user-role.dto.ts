import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCompanyUserRoleDto {
    @ApiProperty({ description: "This is the name of the user role" })
    @IsNotEmpty()
    @IsString() readonly name: string
}