import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity as User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
    constructor (@InjectRepository(User) private readonly userRepo: Repository<User> ){}
    
    getUsers(): Promise<User[]>{
        return this.userRepo.find({
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async getUserById(id: string){
        const user = await this.userRepo.findOne(id)
        if(user){
            return user
        }else{
            throw new NotFoundException(`User with ID "${id}" not found`)
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

    async updateUser(id: string, data: UpdateUserDto): Promise<any>{
        const user = await this.userRepo.findOne(id)
        if(user){
            const result = await this.userRepo.update(id, data)
            if(result.affected === 0){
                throw new NotFoundException(`User with ID "${id}" could not be updated`)
            }
            return Promise.resolve({
                status: 'success',
                result
            })
        }else{
            throw new NotFoundException(`User with ID "${id}" not found`)
        } 
                
    }

    async deleteUser(id: string): Promise<any>{
        // verify first (PENDING)
        const result = await this.userRepo.delete(id)
        if(result.affected === 0){
            throw new NotFoundException(`User with ID "${id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    async getUserByEmail(email: string): Promise<User>{
        return this.userRepo.findOne({ 
            where: {email}
        })
    }
        
}
