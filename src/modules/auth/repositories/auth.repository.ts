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
            //.leftJoinAndSelect('company.created_by', 'company_owner')
            // .leftJoinAndSelect('company.business_sectors', 'company_business_sectors')
            // .leftJoinAndSelect('company_business_sectors.business_sector','system_business_sector')
            // .leftJoinAndSelect('company.business_stages', 'company_business_stages')
            // .leftJoinAndSelect('company_business_stages.business_stage','system_business_stage')
            // .leftJoinAndSelect('company.customer_segments', 'company_customer_segements')
            // .leftJoinAndSelect('company_customer_segements.customer_segment','system_customer_segment')
            // .leftJoinAndSelect("company.sustainable_goals", "company_sustainable_goals")
            // .leftJoinAndSelect('company_sustainable_goals.sustainable_goal',"system_sustainable_goal")
            // .leftJoinAndSelect('company.team_members', 'team_members')
            // .leftJoinAndSelect('team_members.user', 'memberProfile')
            .getOne();  
            
        if(user && ( await this.passwordsAreEqual(user.password, loginDto.password) )){
            //const { password, ...result } = user
            return user
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