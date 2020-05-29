import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCompanyConversationDto } from './dto/create-company-conversation.dto'

@ApiTags('Companies Converstions')
@Controller('/companies/:companyId/conversations')
export class CompaniesConversationsController {
    @Get()
    @ApiOperation({ summary: 'Get all company conversations', description: 'This will be used to get a list of company conversations'  })
    @ApiResponse({ status: 200, description: 'List of company conversations fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string
    ) {
        return { companyId }
    }
    
    @Post()
    @ApiOperation({summary: 'Register a company conversation', description: 'This will be used to create a new company conversation' })
    @ApiResponse({ status: 200, description: 'Creating new company conversation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Body() createCompanyConversationDto: CreateCompanyConversationDto
    ) {
        return { companyId, createCompanyConversationDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company conversation', description: 'This will be used to delete a company conversation' })
    @ApiResponse({ status: 200, description: 'Deleting of the company conversation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('id') id: string
    ) {
        return { id, companyId }
    }
}
