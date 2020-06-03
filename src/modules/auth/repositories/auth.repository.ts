import { Repository, EntityRepository } from 'typeorm';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../users/user.entity';
import { LoginDto } from '../dto/login-dto';
import { UsersService } from '../../users/users.service'

@EntityRepository(UserEntity)
export class AuthRepository extends Repository<UserEntity> {
    private logger = new Logger('AuthRepository');
    constructor(private usersService: UsersService){
        super()
    }

    async validateUserPassword(loginDto: LoginDto): Promise<any>{
        const user = await this.usersService.getUserByEmail(loginDto.email)
        
        if(user && ( await this.passwordsAreEqual(user.password, loginDto.password) )){
            const { password, ...result } = user
            return result
        }else{
            return null
        }
    }

    private async passwordsAreEqual(
        hashedPassword: string,
        plainPassword: string
    ){
        return await bcrypt.compare(plainPassword, hashedPassword)
    }

}