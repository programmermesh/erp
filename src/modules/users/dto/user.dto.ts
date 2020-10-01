import { Exclude, Expose } from "class-transformer";
import { AbstractDto } from '../../../common/dto/abstract.dto'

@Exclude()
export class UserDto extends AbstractDto{

    @Expose()
    email: string

    @Expose()
    firstname_lastname: string

    @Expose()
    surname: string
    
    @Expose()
    password: string
    
    @Expose()
    profile_photo: string
    
    @Expose()
    country: string
    
    @Expose()
    city: string
    
    @Expose()
    facebook: string
    
    @Expose()
    linkedin: string
    
    @Expose()
    twitter: string
    
    @Expose()
    youtube: string
    
    @Expose()
    others: string
    
    @Expose()
    is_active: boolean
}