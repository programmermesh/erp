
import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { UserEntity as User } from '../users/user.entity'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { FILETYPE } from '../../common/enum_values'
import { uploadImageToS3 } from '../../utils/s3UploadImages'
import { CompaniesPitchDecksFilesEntity as PitchDeckFile } from './companies-pitch-decks-files.entity'
import { PitchDecksEntity as PitchDeck } from '../companies-pitch-decks/pitch-decks.entity'

@Injectable()
export class CompaniesPitchDecksFilesService {
    constructor (
        @InjectRepository(PitchDeckFile) private readonly pitchDeckFileRepo: Repository<PitchDeckFile>,
        @InjectRepository(PitchDeck) private readonly pitchDeckRepo: Repository<PitchDeck> 
    ){}
    private logger = new Logger('CompaniesPitchDecksFilesService')
    private entity_prefix_name: string = 'Company Pitch Deck File'
    
    async getAll( params: ValidParamId, user: User ): Promise<PitchDeckFile[]>{
        return await this.pitchDeckFileRepo.find({
            where: {
                pitch_deck: {
                    id: params.pitch_deckId,
                    company: {
                        id: params.companyId
                    }
                }                
            },            
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findById(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async uploadFile(params: ValidParamId, file: any, fileType: FILETYPE, user: User): Promise<any>{
        const requestFound = await this.pitchDeckRepo.findOne({ 
            where: { 
                id: params.pitch_deckId,
                company:{
                    id: params.companyId,
                    // created_by: user
                }
            } 
        })
        if(!requestFound){
            throw new NotFoundException(`Pitch Deck with ID ${params.pitch_deckId} does not exists`)
        }else{   
            try {    
                const urlKey = `pitch_deck_files/${params.companyId}/${Date.now().toString()}-${file.originalname}`
        
                const data = await uploadImageToS3(
                    params,
                    file,
                    urlKey
                )
                if(data.success){
                    //save the the market potential table
                    const newFile = new PitchDeckFile()
                    newFile.pitch_deck_file_url = data.url
                    newFile.pitch_deck = requestFound
                    newFile.name = file.originalname
                    const result = await this.pitchDeckFileRepo.save(newFile)
                    return Promise.resolve({
                        status: 'success',
                        result
                    }) 
                }
                
            } catch(error){
                this.logger.error(error.message, error.stack)
                throw new InternalServerErrorException()
            }
        }
        
    }

    async delete(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findById(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.pitchDeckFileRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findById(params: ValidParamId, user: User){
        const requestFound = await this.pitchDeckFileRepo.findOne({ 
            where: { 
                id: params.id,
                pitch_deck: {
                    id: params.pitch_deckId,
                    company: {
                        id: params.companyId
                    }
                } 
            } 
        })
        return requestFound
    }
}

