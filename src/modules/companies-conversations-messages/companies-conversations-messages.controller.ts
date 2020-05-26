
import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies Conversations Messages')
@Controller('/companies/:comp_id/conversations/:c_id/messages')
export class CompaniesConversationsMessagesController {
    @Get()
    @ApiOperation({ summary: 'Get all company conversations messages', description: 'This will be used to get a list of company conversations messages'  })
    @ApiResponse({ status: 200, description: 'List of company conversations messages fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company conversations messages response data object'
    }
    
    @Post()
    @ApiOperation({summary: 'Post a company conversation message', description: 'This will be used to create a new company conversation message' })
    @ApiResponse({ status: 200, description: 'Creating new company conversation message successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company conversation message', description: 'This will be used to delete a company conversation message' })
    @ApiResponse({ status: 200, description: 'Deleting of the company conversation message successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company conversation message response data object'
    }
}
