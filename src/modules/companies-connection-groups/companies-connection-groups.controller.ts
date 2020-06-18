import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import {CompaniesConnectionGroupsService } from './companies-connection-groups.service'
import { CreateConnectionGroupsDto } from './dto/create-company-connection-group.dto'
import { UpdateConnectionGroupsDto } from './dto/update-company-connection-group.dto'
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Companies Connection groups ')
@Controller('companies/:companyId/connection_groups')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesConnectionGroupsController {
    constructor(
        private readonly companiesConnectionGroupsService: CompaniesConnectionGroupsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company connection groups ', description: 'This will be used to get a list of company connection groups'  })
    @ApiResponse({ status: 200, description: 'List of company connection groups fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Request() req
    ){
        return this.companiesConnectionGroupsService.getAll(params,req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company connection groups' , description: 'This will be used to get the a company connection groups using the ID' })
    @ApiResponse({ status: 200, description: 'company connection groups fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req
    ) {
        return this.companiesConnectionGroupsService.getById(params,req.user)
    }

    @Post()
    @ApiOperation({summary: 'Create a company connection group', description: 'This will be used to create a new company connection group the will be used in the system ' })
    @ApiResponse({ status: 200, description: 'Creating new company connection group successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Request() req,
        @Body() createConnectionGroupsDto: CreateConnectionGroupsDto
    ) {
        return this.companiesConnectionGroupsService.create(
            params,
            req.user,
            createConnectionGroupsDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company connection group', description: 'This will be used to update a company connection group using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company connection group successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req,
        @Body() updateConnectionGroupsDto: UpdateConnectionGroupsDto
    ) {
        return this.companiesConnectionGroupsService.update(
            params,
            req.user,
            updateConnectionGroupsDto
        )
    }

    @Patch('/:id/upload_cover_photo')
    @ApiOperation({ summary: 'Upload a company connection group', description: 'This will be used to update a company connection group image using the ID ' })
    @ApiResponse({ status: 200, description: 'Upload the company connection group Image successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    @UseInterceptors(FileInterceptor('file'))
    uploadLogo(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req,
        @UploadedFile() file: any
    ){
        return this.companiesConnectionGroupsService.uploadConnectionGroupCoverImage(
            params,
            req.user,
            file
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company connection group', description: 'This will be used to delete a company connection group ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company connection group successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req
    ) {
        return this.companiesConnectionGroupsService.delete(params, req.user)
    }
}