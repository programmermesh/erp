import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateConversationsMembersDto } from './dto/create-conversation-members.dto'

@ApiTags('Companies Conversations Members')
@Controller('/companies/:companyId/conversations/:c_id/members')
export class CompaniesConversationsMembersController {
    @Get()
    @ApiOperation({ summary: 'Get all company conversations members', description: 'This will be used to get a list of company conversations members'  })
    @ApiResponse({ status: 200, description: 'List of company conversations members fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string,
        @Param('c_id') conversationId: string
    ){
        return { companyId, conversationId, members: [] }
    }
    
    @Post()
    @ApiOperation({summary: 'Post a company conversation member', description: 'This will be used to create a new company conversation member' })
    @ApiResponse({ status: 200, description: 'Creating new company conversation member successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Param('c_id') conversationId: string,
        @Body() createConversationsMembersDto: CreateConversationsMembersDto
    ) {
        return { conversationId , companyId, createConversationsMembersDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company conversation member', description: 'This will be used to delete a company conversation member' })
    @ApiResponse({ status: 200, description: 'Deleting of the company conversation member successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('c_id') conversationId: string,
        @Param('id') messageId: string
    ){
        return { messageId, conversationId, companyId }
    }
}
