import { Injectable, UnauthorizedException, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthRepository } from './repositories/auth.repository'
import { LoginDto } from './dto/login-dto'
import { ResetPasswordRequestDto } from './dto/reset-password-dto'
import { ResetPasswordRequestEntity } from './reset-password.entity'
import { UpdatePasswordRequestDto } from './dto/update-password.dto'
import { sendMail } from '../../utils/sendEmail'
import { UserEntity } from '../users/user.entity';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService')

    constructor(
        @InjectRepository(AuthRepository) private authRepository: AuthRepository,
        @InjectRepository(ResetPasswordRequestEntity) private passwordRepo: Repository<ResetPasswordRequestEntity>,
        private jwtService: JwtService
    ){}

    async login(loginDto: LoginDto): Promise<any>{
        const validUser = await this.authRepository.validateUserPassword(loginDto)

        if(!validUser){
            throw new UnauthorizedException('Invalid Credentials')
        }

        let { profile_photo, firstname_lastname } = validUser

        const payload = { email: validUser.email, id: validUser.id, name: firstname_lastname, profile_photo }
        const access_token = this.jwtService.sign(payload)       
        return { access_token }
    }

    generateToken(validUser: UserEntity):string{
        const payload = { email: validUser.email, id: validUser.id, name: validUser.firstname_lastname, profile_photo: validUser.profile_photo }
        const access_token = this.jwtService.sign(payload)       
        return access_token
    }

    async createResetPasswordRequest(data: ResetPasswordRequestDto): Promise<any>{
        const emailFound = await this.authRepository.findOne({
            where: {email: data.email}
        })
        
        if(!emailFound){
            throw new NotFoundException(`Email does not seem to be registered`)
        }

        const newResetPasswordRequest = new ResetPasswordRequestEntity()
        newResetPasswordRequest.users = emailFound

        try {
            const result = await this.passwordRepo.save(newResetPasswordRequest)
            const { users, ...sendResult } = result
            if(!data.userIsSignedIn){
                /*PENDING::::SEND A LINK TO THE EMAIL*/
                this.sendResetPasswordEmail(result.id, data.email) 
            }
            
            return { 
                status: 'success', 
                result: data.userIsSignedIn ? result.id : 'Password reset request created successfully. Please check your email for more info on how to reset the password'
            }
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }
    }

    async fulfilPasswordRequest(id: string, updateData: UpdatePasswordRequestDto): Promise<any>{
        const requestFound = await this.passwordRepo.findOne({
            where: { id, isActive: true },
            relations: ['users']
        })

        if(!requestFound){
            throw new NotFoundException(`Link is expired or has already been used to reset pasword`)
        }

        try {
            const updatedUser = this.authRepository.merge(requestFound.users, updateData)
            await this.authRepository.save(updatedUser)
            //update the active_status of the request so that it cannot be used again
            const updateRequest = this.passwordRepo.merge(requestFound, { isActive: false })
            await this.passwordRepo.save(updateRequest)

            return Promise.resolve({
                status: 'success',
                result: 'Password reset successful'
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }            
    }

    private async sendResetPasswordEmail(token: string, email: string){
        const reset_password_url =  `${process.env.FRONTEND_BASE_URL}/reset-password/${token}`
        // IF newUser add a parameter
        const compose = `Hello! <br><br> A request to reset your vibrant creator app account has been initiated.<br><br>`+
                `To reset the password please use the following link.<br>`+
                `<a href="${reset_password_url}">${reset_password_url}</a><br><br>`+
                `If you did not initiate this, please ignore this email.`
                
        await sendMail(
            email,
            "Password reset request",
            "You requested a password reset",
            compose)
        return true
    }

}
