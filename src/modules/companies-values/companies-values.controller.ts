import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateCompanyValueDto } from './dto/create-company-value.dto'
import { UpdateCompanyValueDto } from './dto/update-company-value.dto'
import { CompaniesValuesService } from './companies-values.service'

@ApiTags('Companies Values')
@Controller('/companies/:companyId/values')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesValuesController {

    constructor(
        private readonly companiesValuesService: CompaniesValuesService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company values', description: 'This will be used to get a list of company values'  })
    @ApiResponse({ status: 200, description: 'List of company values fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesValuesService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company value' , description: 'This will be used to get the a company value using the ID' })
    @ApiResponse({ status: 200, description: 'company values fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesValuesService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company values', description: 'This will be used to create a new company values' })
    @ApiResponse({ status: 200, description: 'Creating new company values successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createCompanyValueDto: CreateCompanyValueDto
    ) {
        return this.companiesValuesService.create(
            params,
            req.user,
            createCompanyValueDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company values', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company values details successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateCompanyValueDto: UpdateCompanyValueDto
    ) {
        return this.companiesValuesService.update(
            params,
            req.user,
            updateCompanyValueDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company value', description: 'This will be used to delete a company value' })
    @ApiResponse({ status: 200, description: 'Deleting of the company value successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesValuesService.delete(params, req.user)
    }
}
