import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getManager } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateCompanyConversationDto } from './dto/create-company-conversation.dto'
import { UpdateCompanyConversationDto } from './dto/update-company-conversation.dto'
import { NetworkConversationEntity as CompanyConversation } from './company-conversation.entity'
import { UserEntity as User } from '../users/user.entity'
import { CompanyEntity as Company } from '../companies/company.entity'
import { ConversationsMembersEntity as ConversationsMember } from '../companies-conversations-members/conversations-members.entity'

@Injectable()
export class CompaniesConversationsService {
    constructor (
        @InjectRepository(CompanyConversation) private readonly companyConversationRepo: Repository<CompanyConversation>,
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(ConversationsMember) private readonly conversationsMemberRepo: Repository<ConversationsMember>
    ){}
    private logger = new Logger('CompaniesConversationsService')
    private entity_prefix_name: string = 'Companies Conversation'
    
    async getAll(params: ValidParamId, user: User): Promise<CompanyConversation[]>{
        //get all conversations the user company has been added as a member   
        
        const companyConversations = await this.companyConversationRepo
            .createQueryBuilder('company_conv')
            .leftJoinAndSelect("company_conv.conversation_members", "conversation_members")
            .select([
                'company_conv.id',
                'company_conv.createdAt',
                'company_conv.title'
            ])
            .where(
                "conversation_members.company = :id",
                {id: params.companyId}
            )
            .orderBy('company_conv.createdAt', 'ASC')
            .getMany()

        return companyConversations
    }

    async getById(params: ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findCompanyConversationById(params, user)
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' not found`)
        } 
    }

    async create( params: ValidParamId, user: User, newData: CreateCompanyConversationDto): Promise<any>{
        const requestFound = await this.companyRepo.findOne({
            where: {
                id: params.companyId,
                created_by: user
            }
        })
        if(!requestFound){
            throw new NotFoundException(`Company under user account does not exists`)
        }else{   
            try {
                const newCompanyConversation = new CompanyConversation()
                newCompanyConversation.company = requestFound
                newCompanyConversation.title = newData.title? newData.title : null
                
                const result = await this.companyConversationRepo.save(newCompanyConversation)                
                
                //add owner to conversation
                const newMember = new ConversationsMember()
                newMember.company = requestFound
                newMember.network_conversations = result
                const newMemberResult = await this.conversationsMemberRepo.save(newMember)

                return Promise.resolve({
                    status: 'success',
                    result,
                    newMemberResult
                })
            } catch(error){
                this.logger.error(error.message, error.stack)
                throw new InternalServerErrorException()
            }
        }
        
    }

    async update(params: ValidParamId, user: User, updateData: UpdateCompanyConversationDto): Promise<any>{
        
        const requestFound = await this.findCompanyConversationById(params, user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.companyConversationRepo.merge(requestFound, updateData)
            const result = await this.companyConversationRepo.save(requestFound)
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
        const requestFound = await this.findCompanyConversationById(params, user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.companyConversationRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findCompanyConversationById(params: ValidParamId, user: User){
        const requestFound = await this.companyConversationRepo.findOne({ 
            where: { 
                id: params.id,
                company: {
                    id: params.companyId,
                    //created_by: user
                }
            } 
        })

        // const requestFound = await this.companyConversationRepo
        //     .createQueryBuilder('company_conv')
        //     .leftJoinAndSelect("company_conv.conversation_members", "conversation_members")
        //     .select([
        //         'company_conv.id',
        //         'company_conv.createdAt',
        //         'company_conv.title'
        //     ])
        //     .where(
        //         "company_conv.id = :id",
        //         {id: params.id}
        //     )
        //     .andWhere(
        //         "conversation_members.company = :id",
        //         {id: params.companyId}
        //     )
        //     .orderBy('company_conv.createdAt', 'ASC')
        //     .getOne()
        return requestFound
    }
}
