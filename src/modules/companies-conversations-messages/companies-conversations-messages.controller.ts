import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateConversationMessageDto } from './dto/create-conversation-message.dto'
import { CompaniesConversationsMessagesService } from './companies-conversations-messages.service'

@ApiTags('Companies Conversations Messages')
@Controller('/companies/:companyId/conversations/:conversationId/messages')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesConversationsMessagesController {
    
    constructor(
        private readonly companiesConversationsMessagesService: CompaniesConversationsMessagesService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company conversations messages', description: 'This will be used to get a list of company conversations messages'  })
    @ApiResponse({ status: 200, description: 'List of company conversations messages fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesConversationsMessagesService.getAll(params, req.user)
    }

    
    @Post()
    @ApiOperation({summary: 'Post a company conversation message', description: 'This will be used to create a new company conversation message' })
    @ApiResponse({ status: 200, description: 'Creating new company conversation message successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createConversationMessageDto: CreateConversationMessageDto
    ) {
        return this.companiesConversationsMessagesService.create(
            params,
            req.user,
            createConversationMessageDto
        )
    }

    @Patch('/:id')
    @ApiOperation({summary: 'Update a company conversation message', description: 'This will be used to update company conversation message' })
    @ApiResponse({ status: 200, description: 'Update a company conversation message successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateConversationMessageDto: CreateConversationMessageDto
    ) {
        return this.companiesConversationsMessagesService.create(
            params,
            req.user,
            updateConversationMessageDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company conversation message', description: 'This will be used to delete a company conversation message' })
    @ApiResponse({ status: 200, description: 'Deleting of the company conversation message successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesConversationsMessagesService.delete(params, req.user)
    }
}
