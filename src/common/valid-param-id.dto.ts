import { IsString, IsUUID } from 'class-validator'
export class ValidParamId {
    @IsUUID() readonly id: string
}