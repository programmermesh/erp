import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompaniesCompetitionsService } from './companies-competitions.service'
import { CreateCompanyCompetitorDto } from './dto/create-company-competitor.dto'
import { UpdateCompanyCompetitorDto } from './dto/update-company-competitor.dto'

@ApiTags('Companies Competitions')
@Controller('/companies/:companyId/competitors')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesCompetitionsController {
    
    constructor(
        private readonly companiesCompetitionsService: CompaniesCompetitionsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company competitiors', description: 'This will be used to get a list of company competitiors'  })
    @ApiResponse({ status: 200, description: 'List of company competitiors fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesCompetitionsService.getAll(params,req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company competitior' , description: 'This will be used to get the a company competitior using the ID' })
    @ApiResponse({ status: 200, description: 'company competitiors fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesCompetitionsService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company competitior', description: 'This will be used to create a new company competitior' })
    @ApiResponse({ status: 200, description: 'Creating new company competitior successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createCompanyCompetitorDto: CreateCompanyCompetitorDto
    ) {
        return this.companiesCompetitionsService.create(
            params,
            req.user,
            createCompanyCompetitorDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company competitiors', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company competitiors details successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateCompanyCompetitorDto: UpdateCompanyCompetitorDto
    ) {
        return this.companiesCompetitionsService.update(
            params,
            req.user,
            updateCompanyCompetitorDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company competitior', description: 'This will be used to delete a company competitior' })
    @ApiResponse({ status: 200, description: 'Deleting of the company competitior successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesCompetitionsService.delete(params,req.user)
    }
}
