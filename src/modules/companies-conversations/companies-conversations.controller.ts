import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateCompanyConversationDto } from './dto/create-company-conversation.dto'
import { UpdateCompanyConversationDto } from './dto/update-company-conversation.dto'
import { CompaniesConversationsService } from './companies-conversations.service'

@ApiTags('Companies Conversations')
@Controller('/companies/:companyId/conversations')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesConversationsController {
    
    constructor(
        private readonly companiesConversationsService: CompaniesConversationsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company conversations', description: 'This will be used to get a list of company conversations'  })
    @ApiResponse({ status: 200, description: 'List of company conversations fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesConversationsService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get company conversations by ID', description: 'This will be used to get a company conversations by its ID'  })
    @ApiResponse({ status: 200, description: 'Company conversation fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesConversationsService.getById(params, req.user)
    }
    
    @Post()
    @ApiOperation({summary: 'Register a company conversation', description: 'This will be used to create a new company conversation' })
    @ApiResponse({ status: 200, description: 'Creating new company conversation successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createCompanyConversationDto: CreateCompanyConversationDto
    ) {
        return this.companiesConversationsService.create(
            params,
            req.user,
            createCompanyConversationDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company conversation', description: 'This will be used to update a company conversation using the ID ' })
    @ApiResponse({ status: 200, description: 'Updating the company conversation successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateCompanyConversationDto: UpdateCompanyConversationDto
    ){
        return this.companiesConversationsService.update(
            params,
            req.user,
            updateCompanyConversationDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company conversation', description: 'This will be used to delete a company conversation' })
    @ApiResponse({ status: 200, description: 'Deleting of the company conversation successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesConversationsService.delete(params,req.user)
    }
}
