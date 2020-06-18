import { Injectable, NotFoundException, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateConversationsMembersDto } from './dto/create-conversation-members.dto'
import { ConversationsMembersEntity as ConversationsMember } from './conversations-members.entity'
import { NetworkConversationEntity as CompanyConversation } from '../companies-conversations/company-conversation.entity'
import { UserEntity as User } from '../users/user.entity'
import { CompanyEntity as Company } from '../companies/company.entity'

@Injectable()
export class CompaniesConversationsMembersService {
    constructor (
        @InjectRepository(CompanyConversation) private readonly companyConversationRepo: Repository<CompanyConversation>,
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(ConversationsMember) private readonly conversationsMemberRepo: Repository<ConversationsMember>,
    ){}
    private logger = new Logger('CompaniesConversationsMembersService')
    private entity_prefix_name: string = 'Companies Conversation Member'
    
    async getAll(params: ValidParamId, user: User): Promise<ConversationsMember[]>{
        return await this.conversationsMemberRepo.find({
            where:{
                network_conversations:{
                    id: params.conversationId,
                    company:{
                        id: params.companyId,
                        created_by: user
                    }
                }                
            },                        
            order: {
                createdAt: 'DESC'
            },
            relations: ['company', 'network_conversations']
        });

        //const result = await this.companyConversationRepo.find
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findConversationMemberById(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create( params: ValidParamId, user: User, newData: CreateConversationsMembersDto): Promise<any>{
        const requestFound = await this.conversationsMemberRepo.findOne({
            where: {
                network_conversations: {
                    id: params.conversationId,
                    company: {
                        id: params.companyId,
                        created_by: user
                    }
                },
                company: newData.companyId
            }
        })
        if(requestFound){
            throw new BadRequestException(`Member already added to conversation`)
        }else{   
            try {
                const newConversationsMember = new ConversationsMember()
                newConversationsMember.company = await this.companyRepo.findOne(newData.companyId)
                newConversationsMember.network_conversations = await this.companyConversationRepo.findOne(params.conversationId)
                
                const result = await this.conversationsMemberRepo.save(newConversationsMember)                
                
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
    

    async delete(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findConversationMemberById(params, user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.conversationsMemberRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findConversationMemberById(params: ValidParamId, user: User){
        const requestFound = await this.conversationsMemberRepo.findOne({ 
            where: { 
                id: params.id,
                network_conversations: {
                    id: params.conversationId,
                    company: {
                        id: params.companyId,
                        created_by: user
                    }
                }                    
            },
            relations:['company'] 
        })
        return requestFound
    }
}
