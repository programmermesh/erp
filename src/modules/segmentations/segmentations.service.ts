
import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { SegmentationsEntity as Segmentation } from './segmentations.entity'
import { CUSTOMERS_SEGMENTS_CATEGORIES } from '../../common/enum_values'
import { CreateSegmenationDto} from './dto/createDto'
import { UpdateSegmenationDto } from './dto/updateDto'

@Injectable()
export class SegmentationsService {
    constructor (@InjectRepository(Segmentation) private readonly segmentationRepo: Repository<Segmentation> ){}
    private logger = new Logger('SegmentationsService')
    private entity_prefix_name: string = 'Segmentation'
    
    async getAll(): Promise<any>{
        let result = await this.segmentationRepo.find({            
            order: {
                title: 'DESC'
            }
        });
        if(result && result.length){
            return { status: 'success', result }
        }else{
            const defaultData = [
                { "title": "Usage", "category": "behavioral" },
                { "title": "Type Of Buyer", "category": "demographic" },
                { "title": "Technology involved", "category": "demographic" },
                { "title": "Spending Pattern", "category": "behavioral" },
                { "title": "Social Media Presence", "category": "psychographic" },
                { "title": "Relationship Status", "category": "demographic" },
                { "title": "Personality", "category": "psychographic" },
                { "title": "Occupation", "category": "demographic" },
                { "title": "Number of employees", "category": "demographic" },
                { "title": "Mode of Payment", "category": "behavioral" },
                { "title": "Market Capital", "category": "demographic" },
                { "title": "Likes", "category": "behavioral" },
                { "title": "Lifestyle", "category": "psychographic" },
                { "title": "Industry served", "category": "demographic" },
                { "title": "Industry", "category": "demographic" },
                { "title": "Income Bracket", "category": "demographic" },
                { "title": "Gender", "category": "demographic" },
                { "title": "Education Stage", "category": "demographic" },
                { "title": "Countries", "category": "geography" },
                { "title": "Continent", "category": "geography" },
                { "title": "Business Stage", "category": "demographic" },
                { "title": "Brand Loyalty", "category": "behavioral" },
                { "title": "Age Bracket", "category": "demographic" }
              ]
            for (let index = 0; index < defaultData.length; index++) {
                const newEntry = new Segmentation()
                newEntry.title = defaultData[index].title
                newEntry.category = CUSTOMERS_SEGMENTS_CATEGORIES[defaultData[index].category] 
                await this.segmentationRepo.save(newEntry)
            }
            result = await this.segmentationRepo.find({})
            return result
        }
        
    }

    async getById(id: string): Promise<any>{
        const result = await this.segmentationRepo.findOne({ 
            where: { 
                id
            } 
        })
        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' not found`)
        } 
    }

    async create(newData: CreateSegmenationDto): Promise<any>{
        const requestFound = await this.segmentationRepo.findOne({ 
            where: { 
                title: newData.title,
                category: newData.category
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.title}' already already`)
        }else{   
            try {    
                const newEntry = new Segmentation()
                this.segmentationRepo.merge(newEntry, newData)
                const result = await this.segmentationRepo.save(newEntry)                
                
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

    async update(id: string, updateData: UpdateSegmenationDto): Promise<any>{
        
        const requestFound = await this.segmentationRepo.findOne({ 
            where: { 
                id
            } 
        })
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' by current user cannot be found `)
        }

        try {
            this.segmentationRepo.merge(requestFound, updateData)
            const result = await this.segmentationRepo.save(requestFound)
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
        const requestFound = await this.segmentationRepo.findOne({ 
            where: { 
                id
            } 
        })

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${id}' cannot be found `)
        }

        const result = await this.segmentationRepo.delete(id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }
}
