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

        // const user = await this.findOne({ 
        //     where: {
        //         email: loginDto.email
        //     }
        //     }) 
        const user = await this.createQueryBuilder('row')
            .addSelect('row.password')
            .where('row.email = :name', {name: loginDto.email})
            .leftJoinAndSelect('row.last_accessed_company', 'company')
            .getOne();  
            
        if(user && ( await this.passwordsAreEqual(user.password, loginDto.password) )){
            //const { password, ...result } = user
            const { last_accessed_company, ...result } = user // MINIMIZE the data been sent back to create a token
            return {
                ...result,
                last_accessed_company: (last_accessed_company && last_accessed_company.id) ? { id: last_accessed_company.id } : null//just return the ID of the company
            }
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