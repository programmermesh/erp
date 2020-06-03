import { Injectable, HttpException, HttpStatus, UnauthorizedException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login-dto'
import { AuthRepository } from './repositories/auth.repository'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService')
    constructor(
        @InjectRepository(AuthRepository) private authRepository: AuthRepository,
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
}
