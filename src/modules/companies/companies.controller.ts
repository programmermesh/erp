import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { CompaniesService } from './companies.service'
import { AuthGuard } from '../../common/guards'

@ApiTags('Companies')
@Controller('companies')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService){}
    
    @Get()
    @ApiOperation({ summary: 'Get all companies', description: 'This will be used to get a list of companies under the current user'  })
    @ApiResponse({ status: 200, description: 'List of companies fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(@Request() req) {
        return this.companiesService.getCompanies(req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company profile' , description: 'This will be used to get the a company profile using the ID' })
    @ApiResponse({ status: 200, description: 'User profile fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Request() req,
        @Param() params: ValidParamId
    ) {
        return this.companiesService.getCompanyById(params.id, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register/Create a company', description: 'This will be used to create a new company the will be user the currently logged in user' })
    @ApiResponse({ status: 200, description: 'Creating new company successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Request() req,
        @Body() createCompanyDto: CreateCompanyDto
    ){
        return this.companiesService.createCompany(createCompanyDto, req.user)
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company', description: 'This will be used to update a company profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company details successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Request() req,
        @Param() params: ValidParamId,
        @Body() updateCompanyDto: UpdateCompanyDto
    ){
        return this.companiesService.updateCompany(params.id,updateCompanyDto,req.user)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company', description: 'This will be used to delete a compnay but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Request() req,
        @Param() params: ValidParamId
    ) {
        return this.companiesService.deleteCompany(params.id, req.user)
    }
}
