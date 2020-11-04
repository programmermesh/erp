
import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateUserSessionDto as CreateDto } from './dto/create.dto'
import { UpdateUserSessionDto as UpdateDto } from './dto/update.dto'
import { UserSessionsEntity as UserSessions } from './user-sessions.entity'
import { UserEntity as User } from '../users/user.entity'

@Injectable()
export class UserSessionsService {
    constructor (
        @InjectRepository(UserSessions) private readonly userSessionsRepo: Repository<UserSessions>,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ){}
    private logger = new Logger('UserSessionsService')
    private entity_prefix_name: string = 'User session'
    
    async getAll( user: User): Promise<any>{
        const result = await this.userSessionsRepo.find({                        
            order: {
                createdAt: 'DESC'
            },
            relations: ['user']
        });
        return { status: 'success', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const result = await this.findById(params)
        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async getByToken(token: string, user: User): Promise<any>{
        const result = await this.findByToken(token)
        if(!result || !token){
            throw new NotFoundException(`${this.entity_prefix_name}  not found`)
        }else{
            return { status: 'success', result }
        }
        
    }

    async create( newData: CreateDto, user: User): Promise<any>{
        // check if there is a previous "in_use" user session
        // const prevoius_in_use = await this.userSessionsRepo.find({
        //     where: {
        //         user: user,
        //         in_use: true
        //     }
        // })
        // if(prevoius_in_use && prevoius_in_use.length){
        //     //we have user session that are in_use
        //     for (let index = 0; index < prevoius_in_use.length; index++) {
        //         const element = prevoius_in_use[index];
        //         this.userSessionsRepo.merge(element, { in_use: false, active: false })
        //         await this.userSessionsRepo.save(element)                
        //     }
        // }

        //CREATE A NEW SESSION
        try {
            const newUserSession = new UserSessions()
            newUserSession.active = true
            newUserSession.active_time= 0
            newUserSession.user = user
            newUserSession.token = newData.token
            newUserSession.in_use = true
            const result = await this.userSessionsRepo.save(newUserSession)                
            
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch(error){
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }
        
    }

    async update(params: ValidParamId, updateData: UpdateDto, user: User): Promise<any>{
        
        const requestFound = await this.findById(params)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.userSessionsRepo.merge(requestFound, updateData)
            const result = await this.userSessionsRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }
    

    async delete(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findById(params)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.userSessionsRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findById(params: ValidParamId){
        const requestFound = await this.userSessionsRepo.findOne({ 
            where: { 
                id: params.id
            } 
        })
        return requestFound
    }

    private async findByToken(token: string){
        const requestFound = await this.userSessionsRepo.findOne({ 
            where: { 
                token: token
            } 
        })
        return requestFound
    }
}
