import { Injectable, HttpException, HttpStatus, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity as User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
    constructor (@InjectRepository(User) private readonly userRepo: Repository<User> ){}

    private logger = new Logger('Userservice')
    
    getUsers(): Promise<User[]>{
        return this.userRepo.find({
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async getUserById(user: User){
        const userFound = await this.userRepo.findOne(user.id)
        if(userFound){
            return userFound
        }else{
            throw new NotFoundException(`User with ID "${user.id}" not found`)
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

    async updateUser(user: User, updateData: UpdateUserDto): Promise<any>{
        const userFound = await this.userRepo.findOne(user.id)
        if(!userFound){
            throw new NotFoundException(`User with ID "${user.id}" not found`)
        }
        try {
            this.userRepo.merge(userFound, updateData)
            const result = await this.userRepo.save(userFound)
            const { password, ...return_result } = result //remove password from result
            return Promise.resolve({
                status: 'success',
                return_result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        } 
                
    }

    async deleteUser(id: string): Promise<any>{
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
