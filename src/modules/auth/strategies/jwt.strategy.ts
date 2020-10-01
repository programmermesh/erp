import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JWT_CONSTANTS } from '../contants'
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthRepository } from '../repositories/auth.repository';
import { UserEntity } from '../../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('JWTstrategy')

  constructor(@InjectRepository(AuthRepository) private authRepository: AuthRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY || JWT_CONSTANTS.secret,
      ignoreExpiration: false
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { email } = payload;    
    const user = await this.authRepository.findOne({ email })
    if (!user) {
      throw new UnauthorizedException();
    }
    this.logger.debug(`The user is validated`)
    return user
  }
}