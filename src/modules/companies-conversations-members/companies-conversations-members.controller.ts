import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateConversationsMembersDto } from './dto/create-conversation-members.dto'
import { CompaniesConversationsMembersService } from './companies-conversations-members.service'

@ApiTags('Companies Conversations Members')
@Controller('/companies/:companyId/conversations/:conversationId/members')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesConversationsMembersController {
    
    constructor(
        private readonly companiesConversationsMembersService: CompaniesConversationsMembersService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company conversations members', description: 'This will be used to get a list of company conversations members'  })
    @ApiResponse({ status: 200, description: 'List of company conversations members fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesConversationsMembersService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get company conversations member by ID', description: 'This will be used to get a company conversations member by ID'  })
    @ApiResponse({ status: 200, description: 'Company conversations member fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesConversationsMembersService.getById(params, req.user)
    }
    
    @Post()
    @ApiOperation({summary: 'Create a company conversation member', description: 'This will be used to create a new company conversation member' })
    @ApiResponse({ status: 200, description: 'Creating new company conversation member successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createConversationsMembersDto: CreateConversationsMembersDto
    ) {
        if(params.companyId === createConversationsMembersDto.companyId){
            throw new BadRequestException(`Cannont add self to own conversation as a member`)
        }
        return this.companiesConversationsMembersService.create(
            params,
            req.user,
            createConversationsMembersDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company conversation member', description: 'This will be used to delete a company conversation member' })
    @ApiResponse({ status: 200, description: 'Deleting of the company conversation member successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesConversationsMembersService.delete(params, req.user)
    }
}
