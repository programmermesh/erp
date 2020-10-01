import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { uploadImageToS3 } from '../../utils/s3UploadImages'
import { CreateSustainableGoalDto } from './dto/create-sustainable-goal.dto'
import { UpdateSustainableGoalDto } from './dto/update-sustainable-goal.dto'
import { SustainableGoalEntity as SustainableGoal } from './sustainable-goal.entity'

@Injectable()
export class SustainableGoalsService {
    constructor (@InjectRepository(SustainableGoal) private readonly sustainableGoalRepo: Repository<SustainableGoal> ){}
    private logger = new Logger('SustainableGoalsService')
    private entity_prefix_name: string = 'Sustainable Goal'
    
    async getAll(): Promise<any>{
        let result = await this.sustainableGoalRepo.find(); 
        //return { result, total: result.length}
        if(result.length == 17){
            return result
        }

        // sustainable goals should be 17
        const system_sdgs = [
            'NO POVERTY', 'ZERO HUNGER', 'GOOD HEALTH AND WELL-BEING', 'QUALITY EDUCATION', 'GENDER EQUALITY',
            'CLEAN WATER AND SANITATION', 'AFFORDABLE AND CLEAN ENERGY', 'DECENT WORK AND ECONOMIC GROWTH',
            'INDUSTRY INNOVATION AND INFRASTRUCTURE', 'REDUCE INEQUALITIES', 'SUSTAINABLE CITIES AND COMMUNITIES',
            'RESPONSIBLE CONSUMPTION AND PRODUCTION', 'CLIMATE ACTION','LIFE BELOW WATER', 'LIFE ON LAND', 
            'PEACE, JUSTICE AND STRONG INSTITUTIONS', 'PAERTNERSHIPS FOR THE GOALS'
        ]
        for (const [idx, element] of system_sdgs.entries()) {
            let elementExists = await this.findSustainableGoalByname(element)
            if(!elementExists){
                // we create the sustatinable goal
                const newEntry = new SustainableGoal()
                newEntry.name = element
                newEntry.position = (idx+1)                
                await this.sustainableGoalRepo.save(newEntry)  
            }
        }
        result = await this.sustainableGoalRepo.find();
        return result
    }

    async getById(id: string): Promise<any>{
        const requestFound = await this.findSustainableGoalById(id)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' not found`)
        } 
    }

    async create(newData: CreateSustainableGoalDto): Promise<any>{
        const requestFound = await this.sustainableGoalRepo.findOne({ 
            where: { 
                name: newData.name.toUpperCase()
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
        
        const requestFound = await this.findSustainableGoalById(id)
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

    async updateSustainableGoalImage(params: ValidParamId ,file: any){
        const requestFound = await this.findSustainableGoalById(params.id)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        const urlKey = `system_files/sustainable_goals_images/${Date.now().toString()}-${file.originalname}`
        
        const data = await uploadImageToS3(
            params,
            file,
            urlKey
        )
        if(data.success){
            //update the sustainable goal table
            requestFound.sustainable_goal_image = data.url
            const updateImage = await this.sustainableGoalRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                updateImage
            }) 
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

    private async findSustainableGoalById(id: string){
        const requestFound = await this.sustainableGoalRepo.findOne({ 
            where: { id } 
        })
        return requestFound
    }

    private async findSustainableGoalByname(name: string){
        const requestFound = await this.sustainableGoalRepo.findOne({ 
            where: { name: name.toUpperCase() } 
        })
        return requestFound
    }
}
