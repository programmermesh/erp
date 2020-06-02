import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity as User } from './user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
    constructor (@InjectRepository(User) private readonly userRepo: Repository<User> ){}

    getUsers(): Promise<User[]>{
        return this.userRepo.find()
    }

    getUserById(id): Promise<User>{
        return this.userRepo.findOne(id)
    }

    createUser(userData): Promise<User>{
        return this.userRepo.save(userData)
    }
        
}
