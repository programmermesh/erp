import { EntityRepository, Repository } from 'typeorm'
import { UserEntity } from '../user.entity'
import { UserDto } from '../dto/user.dto'
import { CreateUserDto } from '../dto/create-user.dto'
import { Logger } from '@nestjs/common'

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{
    
    private logger = new Logger('UserRepository')
    
}