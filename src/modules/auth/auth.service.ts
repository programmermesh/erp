import { Injectable, UnauthorizedException, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthRepository } from './repositories/auth.repository'
import { LoginDto } from './dto/login-dto'
import { ResetPasswordRequestDto } from './dto/reset-password-dto'
import { ResetPasswordRequestEntity } from './reset-password.entity'
import { UpdatePasswordRequestDto } from './dto/update-password.dto'

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

        const payload = { email: validUser.email, id: validUser.id }
        const access_token = await this.jwtService.sign(payload)

        this.logger.debug(`Generated JWT token with payload ${JSON.stringify(payload)}`)
        
        return { access_token }
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
            /*PENDING::::SEND A LINK TO THE EMAIL*/
            return { status: 'success', data: sendResult }
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
                status: 'success'
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }

            
    }

}
