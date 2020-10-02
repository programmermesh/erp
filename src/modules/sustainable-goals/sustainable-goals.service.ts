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
        // const system_sdgs = [
        //     'NO POVERTY', 'ZERO HUNGER', 'GOOD HEALTH AND WELL-BEING', 'QUALITY EDUCATION', 'GENDER EQUALITY',
        //     'CLEAN WATER AND SANITATION', 'AFFORDABLE AND CLEAN ENERGY', 'DECENT WORK AND ECONOMIC GROWTH',
        //     'INDUSTRY INNOVATION AND INFRASTRUCTURE', 'REDUCE INEQUALITIES', 'SUSTAINABLE CITIES AND COMMUNITIES',
        //     'RESPONSIBLE CONSUMPTION AND PRODUCTION', 'CLIMATE ACTION','LIFE BELOW WATER', 'LIFE ON LAND', 
        //     'PEACE, JUSTICE AND STRONG INSTITUTIONS', 'PAERTNERSHIPS FOR THE GOALS'
        // ]
        const system_sdgs = [
            {
                "name": "NO POVERTY",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596815910106-E-WEB-Goal-01.png",
                "position": 1
            },
            {
                "name": "ZERO HUNGER",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596815968120-E-WEB-Goal-02.png",
                "position": 2
            },
            {
                "name": "GOOD HEALTH AND WELL-BEING",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596816003194-E-WEB-Goal-03.png",
                "position": 3
            },
            {
                "name": "QUALITY EDUCATION",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596816038526-E-WEB-Goal-04.png",
                "position": 4
            },
            {
                "name": "GENDER EQUALITY",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596816067766-E-WEB-Goal-05.png",
                "position": 5
            },
            {
                "name": "CLEAN WATER AND SANITATION",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596816096417-E-WEB-Goal-06.png",
                "position": 6
            },
            {
                "name": "AFFORDABLE AND CLEAN ENERGY",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596816131769-E-WEB-Goal-07.png",
                "position": 7
            },
            {
                "name": "DECENT WORK AND ECONOMIC GROWTH",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596816173334-E-WEB-Goal-08.png",
                "position": 8
            },
            {
                "name": "INDUSTRY INNOVATION AND INFRASTRUCTURE",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596816202686-E-WEB-Goal-09.png",
                "position": 9
            },
            {
                "name": "REDUCE INEQUALITIES",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596816227021-E-WEB-Goal-10.png",
                "position": 10
            },
            {
                "name": "SUSTAINABLE CITIES AND COMMUNITIES",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596816256935-E-WEB-Goal-11.png",
                "position": 11
            },
            {
                "name": "RESPONSIBLE CONSUMPTION AND PRODUCTION",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596816277216-E-WEB-Goal-12.png",
                "position": 12
            },
            {
                "name": "CLIMATE ACTION",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596816301225-E-WEB-Goal-13.png",
                "position": 13
            },
            {
                "name": "LIFE BELOW WATER",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596816333984-E-WEB-Goal-14.png",
                "position": 14
            },
            {
                "name": "LIFE ON LAND",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596816360424-E-WEB-Goal-15.png",
                "position": 15
            },
            {
                "name": "PEACE, JUSTICE AND STRONG INSTITUTIONS",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596816388981-E-WEB-Goal-16.png",
                "position": 16
            },
            {
                "name": "PARTNERSHIPS FOR THE GOALS",
                "sustainable_goal_image": "https://vibrantcreator-files.s3.eu-north-1.amazonaws.com/system_files/sustainable_goals_images/1596816415486-E-WEB-Goal-17.png",
                "position": 17
            }
        ]
        for (const [idx, element] of system_sdgs.entries()) {
            let elementExists = await this.findSustainableGoalByname(element.name)
            if(!elementExists){
                // we create the sustatinable goal
                const newEntry = new SustainableGoal()
                newEntry.name = element.name
                newEntry.position = element.position
                newEntry.sustainable_goal_image = element.sustainable_goal_image                
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
