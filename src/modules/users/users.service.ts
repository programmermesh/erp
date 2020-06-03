import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity as User } from './user.entity'
import { LoginDto } from '../auth/dto/login-dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
    constructor (@InjectRepository(User) private readonly userRepo: Repository<User> ){}
    
    getUsers(): Promise<User[]>{
        return this.userRepo.find({
            order: {
                created_at: 'DESC'
            }
        })
    }

    async getUserById(id: string){
        const user = await this.userRepo.findOne(id)
        if(user){
            return user
        }else{
            throw new HttpException('Cannot find user', HttpStatus.NOT_FOUND);
        } 
    }

    async createUser(userData: CreateUserDto){
        const userExists = await this.userRepo.findOne({email: userData.email})
        if(userExists){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }else{
            const user = await this.userRepo.save(userData)
            if(user){
                //SEND A VERIFICATION EMAIL 
                const { password, ...result } = user           
                return { success: "User created successfully", result }
            }else{
                throw new HttpException('Error trying to register', HttpStatus.BAD_REQUEST);
            }
        }
        
    }

    async updateUser(id: string, data: UpdateUserDto){
        const user = await this.userRepo.findOne(id)
        if(user){
            return this.userRepo.update(id, data)
        }else{
            throw new HttpException('Cannot delete. User not found', HttpStatus.NOT_FOUND);
        } 
                
    }

    async deleteUser(id: string){
        const user = await this.userRepo.findOne(id)
        if(user){
            return this.userRepo.delete(id)
        }else{
            throw new HttpException('Cannot find user', HttpStatus.NOT_FOUND);
        } 
    }

    async getUserByEmail(email: string): Promise<User>{
        return this.userRepo.findOne({email: email})
    }
        
}
