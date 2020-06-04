import { Repository, EntityRepository } from 'typeorm';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../users/user.entity';
import { LoginDto } from '../dto/login-dto';

@EntityRepository(UserEntity)
export class AuthRepository extends Repository<UserEntity> {
    private logger = new Logger('AuthRepository');

    async validateUserPassword(loginDto: LoginDto): Promise<any>{
        this.logger.debug(`Validating a user email and password`)  

        const user = await this.findOne({ email: loginDto.email})        
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