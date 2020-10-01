import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateIncomeBracketDto } from './dto/create-income-bracket.dto'
import { UpdateIncomeBracketDto } from './dto/update-income-bracket.dto'
import { IncomeBracketEntity as IncomeBracket } from './income-bracket.entity'


@Injectable()
export class IncomeBracketsService {
    constructor (
        @InjectRepository(IncomeBracket) private readonly incomeBracketRepo: Repository<IncomeBracket>
    ){}
    private logger = new Logger('IncomeBracketsService')
    private entity_prefix_name: string = 'Income Bracket'
    
    async getAll(): Promise<IncomeBracket[]>{
        return await this.incomeBracketRepo.find({                        
            order: {
                title: 'DESC'
            }
        });
    }

    async getById(params: ValidParamId): Promise<any>{
        const requestFound = await this.findIncomeBracketById(params)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create( newData: CreateIncomeBracketDto): Promise<any>{
        const requestFound = await this.incomeBracketRepo.findOne({ 
            where: { 
                title: newData.title
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with the title '${newData.title}' already exists`)
        }else{   
            try {
                const newIncomeBracket = new IncomeBracket()
                this.incomeBracketRepo.merge(newIncomeBracket, newData)
                const result = await this.incomeBracketRepo.save(newIncomeBracket)                
                
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

    async update(params: ValidParamId, updateData: UpdateIncomeBracketDto): Promise<any>{
        
        const requestFound = await this.findIncomeBracketById(params)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.incomeBracketRepo.merge(requestFound, updateData)
            const result = await this.incomeBracketRepo.save(requestFound)
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
        const requestFound = await this.findIncomeBracketById(params)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.incomeBracketRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findIncomeBracketById(params: ValidParamId){
        const requestFound = await this.incomeBracketRepo.findOne({ 
            where: { 
                id: params.id
            } 
        })
        return requestFound
    }
}
