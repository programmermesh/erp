import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateCompanyRelationDto } from './dto/create-company-relation.dto'
import { CompaniesRelationsService } from './companies-relations.service'

@ApiTags('Companies Relations')
@Controller('/companies/:companyId/relations')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesRelationsController {
    
    constructor(
        private readonly companiesRelationsService: CompaniesRelationsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company relations', description: 'This will be used to get a list of company relations'  })
    @ApiResponse({ status: 200, description: 'List of company relations fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Request() req
    ) {
        return this.companiesRelationsService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company relation' , description: 'This will be used to get the a company relation using the ID' })
    @ApiResponse({ status: 200, description: 'company relations fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,                
        @Param('id') id: string,
        @Request() req
    ){
        return this.companiesRelationsService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Post a company relation', description: 'This will be used to create a new company relation' })
    @ApiResponse({ status: 200, description: 'Creating new company relation successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Request() req,
        @Body() createCompanyRelationDto: CreateCompanyRelationDto 
    ){
        return this.companiesRelationsService.create(params,req.user,createCompanyRelationDto)
    }


    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company relation', description: 'This will be used to delete a company relation' })
    @ApiResponse({ status: 200, description: 'Deleting of the company relation successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,                
        @Param('id') id: string,
        @Request() req
    ){
        this.companiesRelationsService.delete(params,req.user)
    }
}
