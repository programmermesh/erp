import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateConversationMessageDto } from './dto/create-conversation-message.dto'

@ApiTags('Companies Conversations Messages')
@Controller('/companies/:companyId/conversations/:conversationId/messages')
export class CompaniesConversationsMessagesController {
    @Get()
    @ApiOperation({ summary: 'Get all company conversations messages', description: 'This will be used to get a list of company conversations messages'  })
    @ApiResponse({ status: 200, description: 'List of company conversations messages fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string,
        @Param('conversationId') conversationId: string
    ) {
        return { companyId, conversationId }
    }
    
    @Post()
    @ApiOperation({summary: 'Post a company conversation message', description: 'This will be used to create a new company conversation message' })
    @ApiResponse({ status: 200, description: 'Creating new company conversation message successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Param('conversationId') conversationId: string,
        @Body() createConversationMessageDto: CreateConversationMessageDto
    ) {
        return { companyId, conversationId, createConversationMessageDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company conversation message', description: 'This will be used to delete a company conversation message' })
    @ApiResponse({ status: 200, description: 'Deleting of the company conversation message successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('conversationId') conversationId: string,
        @Param('id') messageId: string
    ){
        return { companyId, conversationId, messageId }
    }
}
