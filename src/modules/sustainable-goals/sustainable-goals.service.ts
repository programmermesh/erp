import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CreateSustainableGoalDto } from './dto/create-sustainable-goal.dto'
import { UpdateSustainableGoalDto } from './dto/update-sustainable-goal.dto'
import { SustainableGoalEntity as SustainableGoal } from './sustainable-goal.entity'

@Injectable()
export class SustainableGoalsService {
    constructor (@InjectRepository(SustainableGoal) private readonly sustainableGoalRepo: Repository<SustainableGoal> ){}
    private logger = new Logger('SustainableGoalsService')
    private entity_prefix_name: string = 'Sustainable Goal'
    
    async getAll(): Promise<SustainableGoal[]>{
        return await this.sustainableGoalRepo.find({            
            order: {
                name: 'DESC'
            }
        });
    }

    async getById(id: string): Promise<any>{
        const requestFound = await this.sustainableGoalRepo.findOne({ 
            where: { 
                id
            } 
        })
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' not found`)
        } 
    }

    async create(newData: CreateSustainableGoalDto): Promise<any>{
        const requestFound = await this.sustainableGoalRepo.findOne({ 
            where: { 
                name: newData.name
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.name}' already exists`)
        }else{   
            try {    
                const newEntry = new SustainableGoal()
                this.sustainableGoalRepo.merge(newEntry, newData)
                const result = await this.sustainableGoalRepo.save(newEntry)                
                
                return Promise.resolve({
                    status: 'success',
                    result
                })
            } catch(error){
                this.logger.error(error.message, error.stack)
                throw new InternalServerErrorException()
            }
        }
        
    }

    async update(id: string, updateData: UpdateSustainableGoalDto): Promise<any>{
        
        const requestFound = await this.sustainableGoalRepo.findOne({ 
            where: { 
                id
            } 
        })
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' by current user cannot be found `)
        }

        try {
            this.sustainableGoalRepo.merge(requestFound, updateData)
            const result = await this.sustainableGoalRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }

    async delete(id: string): Promise<any>{
        const requestFound = await this.sustainableGoalRepo.findOne({ 
            where: { 
                id
            } 
        })

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' cannot be found `)
        }

        const result = await this.sustainableGoalRepo.delete(id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }
}
