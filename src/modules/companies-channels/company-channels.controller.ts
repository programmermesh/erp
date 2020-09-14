
import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateCompanyChannelDto } from './dto/create.dto'
import { UpdateCompanyChannelDto } from './dto/update.dto'
import { CompanyChannelsService } from './company-channels.service'

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Company channels')
@Controller('/companies/:companyId/channels')
export class CompanyChannelsController {

    constructor(
        private readonly companyChannelsService: CompanyChannelsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company Channels', description: 'This will be used to get a list of company channels'  })
    get(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companyChannelsService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company channel' , description: 'This will be used to get the a company channel using the ID' })
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companyChannelsService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company channel', description: 'This will be used to create a new company channel' })
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createCompanyChannelDto: CreateCompanyChannelDto
    ) {
        return this.companyChannelsService.create(
            params,
            req.user,
            createCompanyChannelDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company channels', description: 'This will be used to update a company channel using the ID' })
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateCompanyChannelDto: UpdateCompanyChannelDto
    ) {
        return this.companyChannelsService.update(
            params,
            req.user,
            updateCompanyChannelDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company channel', description: 'This will be used to delete a company channel' })
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companyChannelsService.delete(params, req.user)
    }
}

