
import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateCompanyChannelRelationshipDto } from './dto/create.dto'
import { CompaniesChannelsRelationshipService } from './companies-channels-relationship.service'

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Company channels Relationship')
@Controller('/companies/:companyId/channels/:channelId/categories/:channelCategoryId/relationships')
export class CompaniesChannelsRelationshipController {

    constructor(
        private readonly companiesChannelsRelationshipService: CompaniesChannelsRelationshipService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company Channels relationship', description: 'This will be used to get a list of company channels relationship'  })
    get(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesChannelsRelationshipService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company channel relationship' , description: 'This will be used to get the a company channel relationship using the ID' })
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesChannelsRelationshipService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company channel relationship', description: 'This will be used to create a new company channel relationship' })
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createCompanyChannelRelationshipDto: CreateCompanyChannelRelationshipDto
    ) {
        return this.companiesChannelsRelationshipService.create(
            params,
            req.user,
            createCompanyChannelRelationshipDto
        )
    }


    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company channel relationship', description: 'This will be used to delete a company channel relationship' })
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesChannelsRelationshipService.delete(params, req.user)
    }
}

