import { Injectable, NotFoundException, Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateConversationMessageDto } from './dto/create-conversation-message.dto'
import { ConversationMessageEntity as ConversationMessage } from './conversation-message.entity'
import { NetworkConversationEntity as CompanyConversation } from '../companies-conversations/company-conversation.entity'
import { UserEntity as User } from '../users/user.entity'
import { CompanyEntity as Company } from '../companies/company.entity'
import { ConversationsMembersEntity as ConversationMember } from '../companies-conversations-members/conversations-members.entity'

@Injectable()
export class CompaniesConversationsMessagesService {
    constructor (
        @InjectRepository(CompanyConversation) private readonly companyConversationRepo: Repository<CompanyConversation>,
        @InjectRepository(ConversationMessage) private readonly conversationMessageRepo: Repository<ConversationMessage>,
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(ConversationMember) private readonly conversationMemberRepo: Repository<ConversationMember>
    ){}
    private logger = new Logger('CompaniesConversationsMessagesService')
    private entity_prefix_name: string = 'Companies Conversation Message'
    
    async getAll(params: ValidParamId, user: User): Promise<any>{
        const isOwner = await this.isCompanyOwner(user,params.companyId)
        if(!isOwner){
            throw new BadRequestException('Cannot perform task using that company ID.')
        }

        //is the company a member of a conversation
        const isMemberOfConversation = await this.isMemberOfConversation(params)
        if(!isMemberOfConversation){
            throw new BadRequestException('Company is not a member of that conversation')
        }

        const refinedResponse = await this.conversationMessageRepo
            .createQueryBuilder('message')
            .select([
                'message.message', 'message.id', 'message.createdAt',
                'sent_by.id', 'company.name', 'company.id'  
            ])
            .innerJoin('message.network_conversations', 'network_conversations')
            .innerJoin('message.sent_by', 'sent_by')
            .innerJoin('sent_by.company','company')
            .addSelect('company.logo')
            .where(
                "network_conversations.id = :id", { id: params.conversationId }
            )
            .orderBy('message.createdAt','DESC')
            .take(50)
            .getMany()

        return refinedResponse
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const isOwner = await this.isCompanyOwner(user,params.companyId)
        if(!isOwner){
            throw new BadRequestException('Cannot perform task using that company ID.')
        }

        //is the company a member of a conversation
        const isMemberOfConversation = await this.isMemberOfConversation(params)
        if(!isMemberOfConversation){
            throw new BadRequestException('Company is not a member of that conversation')
        }

        const requestFound = await this.findConversationMessageById(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create( params: ValidParamId, user: User, newData: CreateConversationMessageDto): Promise<any>{
        const isOwner = await this.isCompanyOwner(user,params.companyId)
        if(!isOwner){
            throw new BadRequestException('Cannot perform task using that company ID.')
        }
        

        //check if the the current logged user is a member is a conversation
        const requestFound = await this.isMemberOfConversation(params)
        
        if(!requestFound){
            throw new BadRequestException(`Cannot post the message. Company is not a member of that conversation`)
        }else{   
            try {
                const newConversationMessage = new ConversationMessage()
                newConversationMessage.sent_by = requestFound
                newConversationMessage.message = newData.message
                newConversationMessage.network_conversations = requestFound.network_conversations
                
                const result = await this.conversationMessageRepo.save(newConversationMessage)                
                
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

    async update(params: ValidParamId, user: User, updateData: CreateConversationMessageDto): Promise<any>{
        const isOwner = await this.isCompanyOwner(user,params.companyId)
        if(!isOwner){
            throw new BadRequestException('Cannot perform task using that company ID.')
        }

        //is the company a member of a conversation
        const isMemberOfConversation = await this.isMemberOfConversation(params)
        if(!isMemberOfConversation){
            throw new BadRequestException('Company is not a member of that conversation')
        }

        const requestFound = await this.findConversationMessageById(params, user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.conversationMessageRepo.merge(requestFound, updateData)
            const result = await this.conversationMessageRepo.save(requestFound)
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
        const isOwner = await this.isCompanyOwner(user,params.companyId)
        if(!isOwner){
            throw new BadRequestException('Cannot perform task using that company ID.')
        }

        //is the company a member of a conversation
        const isMemberOfConversation = await this.isMemberOfConversation(params)
        if(!isMemberOfConversation){
            throw new BadRequestException('Company is not a member of that conversation')
        }

        const requestFound = await this.findConversationMessageById(params, user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.conversationMessageRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findConversationMessageById(params: ValidParamId, user: User){
        const requestFound = await this.conversationMessageRepo.findOne({ 
            where: { 
                id: params.id,
                sent_by: {
                    company: {
                        id: params.companyId,
                        created_by: user
                    }
                }
            } 
        })
        return requestFound
    }

    private async isCompanyOwner(user: User,companyId:string){
        const requestFound = await this.companyRepo.findOne({
            where: {
                id: companyId,
                created_by: user
            }
        })
        return requestFound
    }

    private async isMemberOfConversation(params: ValidParamId){
        const requestFound = await this.conversationMemberRepo.findOne({
            where: {
                network_conversations: params.conversationId,
                company: params.companyId
            },
            relations: ['network_conversations']
        })
        return requestFound
    }
}
