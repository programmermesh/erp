import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies Conversations Members')
@Controller('/companies/:companyId/conversations/:c_id/members')
export class CompaniesConversationsMembersController {
    @Get()
    @ApiOperation({ summary: 'Get all company conversations members', description: 'This will be used to get a list of company conversations members'  })
    @ApiResponse({ status: 200, description: 'List of company conversations members fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company conversations members response data object'
    }
    
    @Post()
    @ApiOperation({summary: 'Post a company conversation member', description: 'This will be used to create a new company conversation member' })
    @ApiResponse({ status: 200, description: 'Creating new company conversation member successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company conversation member', description: 'This will be used to delete a company conversation member' })
    @ApiResponse({ status: 200, description: 'Deleting of the company conversation member successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company conversation member response data object'
    }
}
