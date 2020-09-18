import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { FILETYPE } from '../../common/enum_values'
import { uploadImageToS3 } from '../../utils/s3UploadImages'
import { PitchDecksEntity as CompanyPitchDeck } from './pitch-decks.entity'
import { CreateCompanyPitchDeckDto } from './dto/create-company-pitch-deck.dto'
import { UpdateCompanyPitchDeckDto } from './dto/update-company-pitch-deck.dto'

@Injectable()
export class CompaniesPitchDecksService {
    constructor (
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(CompanyPitchDeck) private readonly companyPitchDeckRepo: Repository<CompanyPitchDeck> 
    ){}
    private logger = new Logger('CompaniesPitchDecksService')
    private entity_prefix_name: string = 'Company Pitch Deck'
    
    async getAll( params: ValidParamId, user: User ): Promise<any>{
        const result = await this.companyPitchDeckRepo.find({
            select: [
                "title","type","notes","link", "pitch_decks_image",
                "id","createdAt", "updatedAt"
            ],
            where: {
                company:{
                    id: params.companyId
                }
            },            
            order: {
                createdAt: 'DESC'
            }
        });
        return { status: 'success', result }
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const result = await this.findCompaniesPitchDeckById(params, user)
        if(result){
            return { status: 'success', result }
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyPitchDeckDto): Promise<any>{
        const requestFound = await this.companyPitchDeckRepo.findOne({ 
            where: { 
                title: newData.title,
                company:{
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })
        if(requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with name '${newData.title}' already exists`)
        }else{   
            try {    
                const newEntry = new CompanyPitchDeck()
                const saveThis = {
                    ...newData,
                    company: await this.companyRepo.findOne(params.companyId)
                }
                this.companyPitchDeckRepo.merge(newEntry, saveThis)                   

                const result = await this.companyPitchDeckRepo.save(newEntry)                
                
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

    async update(params: ValidParamId, user: User, updateData: UpdateCompanyPitchDeckDto): Promise<any>{
        
        const requestFound = await this.findCompaniesPitchDeckById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.companyPitchDeckRepo.merge(requestFound, updateData)
            const result = await this.companyPitchDeckRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }
    async uploadCoverPhoto(params: ValidParamId, user: User, file:any, filetype: FILETYPE){
        const requestFound = await this.findCompaniesPitchDeckById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        const urlKey = `${filetype}/${params.companyId}/${Date.now().toString()}-${file.originalname}`
        
        const data = await uploadImageToS3(
            params,
            file,
            urlKey
        )
        if(data.success){
            //update the pitch deck
            requestFound.pitch_decks_image = data.url
            const updateImage = await this.companyPitchDeckRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result: updateImage
            }) 
        }
    }
    

    async delete(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.companyPitchDeckRepo.findOne({ 
            where: { 
                id: params.id,
                company: {
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.companyPitchDeckRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCompaniesPitchDeckById(params: ValidParamId, user: User){
        const requestFound = await this.companyPitchDeckRepo.findOne({ 
            where: { 
                id: params.id,
                company: {
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })
        return requestFound
    }
}
