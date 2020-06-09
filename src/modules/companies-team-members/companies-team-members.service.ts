import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CompanyTeamMembersEntity as CompanyTeamMember } from './company-team-members.entity'
import { CompanyEntity as Company } from '../companies/company.entity'
import { UserEntity as User } from '../users/user.entity'
import { CreateCompanyTeamMemberDto } from './dto/create-company-team-member.dto'
import { UpdateCompanyTeamMemberDto } from './dto/update-company-team-member.dto'
import { AccessTypesEntity as AccessType } from '../access-types/access-types.entity'
import { RolesEntity as Role } from '../companies-user-roles/roles.entity'
import { sendMail } from '../../utils/sendEmail'

@Injectable()
export class CompaniesTeamMembersService {
    constructor (
        @InjectRepository(CompanyTeamMember) private readonly companyTeamMemberRepo: Repository<CompanyTeamMember>,
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>,
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
        @InjectRepository(AccessType) private readonly accessTypeRepo: Repository<AccessType>,
    ){}
    private logger = new Logger('CompanyTeamMembersService')
    private entity_prefix_name: string = 'Company Team Member'
    
    async getAll(params: ValidParamId, user: User): Promise<CompanyTeamMember[]>{
        
        return await this.companyTeamMemberRepo.find({
            where: {
                company: params.companyId,
                created_by: user 
            },            
            order: {
                createdAt: 'DESC'
            },
            relations: ['role', 'access_type']
        });
    }

    async getInvitationById(params: ValidParamId): Promise<any>{

        const requestFound = await this.companyTeamMemberRepo.findOne(params.id)
        
        if(requestFound){
            return requestFound
        }else{
            throw new NotFoundException(`${this.entity_prefix_name} Invitation with ID '${params.id}' not found`)
        } 
    }

    async create(params: ValidParamId, user: User, newData: CreateCompanyTeamMemberDto): Promise<any>{
        const requestFound = await this.userRepo.findOne({
            where: {
                email: newData.invite_email
            }                      
        })
        
        if(requestFound){
            //user was found...then get the id
            
            //check if the user exists a team member already
            const alreadyTeamMember = await this.companyTeamMemberRepo.findOne({
                where: {
                    user: requestFound.id,
                    role:{
                        id: newData.role,
                        company: {
                            id: params.companyId
                        }
                    }
                },
                relations: ['role']
            })

            if(alreadyTeamMember){
                //throw new NotFoundException(`User already exists as a team member`)
                return `User already exists as a team member` 
            }else{
                //user not a team member    
                const result = await this.createTeamMember(
                    requestFound,
                    params.companyId,
                    newData
                )
                /*SENDING AN INVITATION EMAIL*/
                const isAnewUser = false
                this.sendInvitationEmail(result.id, newData.invite_email, params)
                /*SENDING AN INVITATION EMAIL*/
                return { status: 'success', data:{ id:result.id } }
            }
            
        }else{              

            try {
                 //user was not found
                const newUser = new User()
                newUser.email = newData.invite_email
                newUser.password = newData.invite_email
                const newUserResult = await this.userRepo.save(newUser)
                //save the team member
                const result = await this.createTeamMember(
                    newUserResult,
                    params.companyId,
                    newData
                )
                /*SENDING AN INVITATION EMAIL*/
                const isAnewUser = true
                this.sendInvitationEmail(result.id, newData.invite_email, params, isAnewUser)
                /*SENDING AN INVITATION EMAIL*/
                return { status: 'success', data:{ id:result.id } }
            } catch (error) {
                this.logger.error(error.message, error.stack)
                throw new InternalServerErrorException()
            }

            
        }
        
    }

    async update(params: ValidParamId, user: User, updateData: UpdateCompanyTeamMemberDto): Promise<any>{
        
        const requestFound = await this.findOneEntityById(params,user)
        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' by current user cannot be found `)
        }

        try {
            this.companyTeamMemberRepo.merge(requestFound, updateData)
            const result = await this.companyTeamMemberRepo.save(requestFound)
            return Promise.resolve({
                status: 'success',
                result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }        
                
    }

    async delete(params : ValidParamId, user: User): Promise<any>{
        const requestFound = await this.findOneEntityById(params,user)

        if(!requestFound){
            throw new NotFoundException(`${this.entity_prefix_name} with ID '${params.id}' cannot be found `)
        }

        const result = await this.companyTeamMemberRepo.delete(params.id)
        if(result.affected === 0){
            throw new NotFoundException(`${this.entity_prefix_name} with ID "${params.id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    private async findOneEntityById(params: ValidParamId, user: User){
        const requestFound = await this.companyTeamMemberRepo.findOne({
            where: { 
                id: params.id, 
                company: { 
                    id: params.companyId , 
                    created_by: user 
                } 
            }                    
        })

        return requestFound
    }

    private async createTeamMember(user:User, companyId: string, newData: CreateCompanyTeamMemberDto){
        
        try {
            const newTeamMemberData = new CompanyTeamMember()
            newTeamMemberData.company = await this.companyRepo.findOne(companyId)
            newTeamMemberData.user = user
            newTeamMemberData.invite_email = newData.invite_email
            newTeamMemberData.access_type = await this.accessTypeRepo.findOne(newData.access_type)
            newTeamMemberData.role = await this.roleRepo.findOne(newData.role)

            const result = await this.companyTeamMemberRepo.save(newTeamMemberData)
            return result
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        }
    } 
    
    private async sendInvitationEmail(id: string, invite_email: string,params: ValidParamId, newUser?: boolean){
        const invitation_url =  `${process.env.BASE_URL}companies/${params.companyId}/team_member_invitation/${id}`
        // IF newUser add a parameter
        const compose = `Hello! <br><br> You have been invited to be part a team member<br><br>`+
                `<a href='${invitation_url}/'>Click here to review your invitation</a>`
                
        await sendMail(
            invite_email,
            "Team member invitation",
            "You have been invited to be part a team member",
            compose)
        return true
    }

}