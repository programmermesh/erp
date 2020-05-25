
import { Controller, Get, Post, Delete } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies Converstions')
@Controller('/companies/:companyId/conversations')
export class CompaniesConversationsController {
    @Get()
    @ApiOperation({ summary: 'Get all company conversations', description: 'This will be used to get a list of company conversations'  })
    @ApiResponse({ status: 200, description: 'List of company conversations fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company conversations response data object'
    }
    
    @Post()
    @ApiOperation({summary: 'Register a company conversation', description: 'This will be used to create a new company conversation' })
    @ApiResponse({ status: 200, description: 'Creating new company conversation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company conversation', description: 'This will be used to delete a company conversation' })
    @ApiResponse({ status: 200, description: 'Deleting of the company conversation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company conversation response data object'
    }
}
