import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateEducationStagesDto } from './dto/create-education-stage.dto'
import { UpdateEducationStagesDto } from './dto/update-education-stage.dto'
import { EducationStagesEntity as EducationStage } from './education-stages.entity'

@Injectable()
export class EducationStagesService {
    constructor (
        @InjectRepository(EducationStage) private readonly educationStageRepo: Repository<EducationStage>
    ){}
    private logger = new Logger('EducationStagesService')
    private entity_prefix_name: string = 'Education stage'
    
    async getAll(): Promise<EducationStage[]>{
        return await this.educationStageRepo.find({                        
            order: {
                title: 'DESC'
            }
        });
    }

    async getById(params: ValidParamId): Promise<any>{
        const requestFound = await this.findEducationStageById(params)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create( newData: CreateEducationStagesDto): Promise<any>{
        const requestFound = await this.educationStageRepo.findOne({ 
            where: { 
                title: newData.title
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with the title '${newData.title}' already exists`)
        }else{   
            try {
                const newEducationStage = new EducationStage()
                this.educationStageRepo.merge(newEducationStage, newData)
                const result = await this.educationStageRepo.save(newEducationStage)                
                
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

    async update(params: ValidParamId, updateData: UpdateEducationStagesDto): Promise<any>{
        
        const requestFound = await this.findEducationStageById(params)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.educationStageRepo.merge(requestFound, updateData)
            const result = await this.educationStageRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }
    

    async delete(params: ValidParamId): Promise<any>{
        const requestFound = await this.findEducationStageById(params)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.educationStageRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findEducationStageById(params: ValidParamId){
        const requestFound = await this.educationStageRepo.findOne({ 
            where: { 
                id: params.id
            } 
        })
        return requestFound
    }
}
