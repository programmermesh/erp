import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { PaginationDto } from './dto/pagination.dto'
import { CompaniesService } from './companies.service'
import { AuthGuard } from '../../common/guards'

@ApiTags('Companies')
@Controller('companies')
//@UseGuards(AuthGuard)
//@ApiBearerAuth()
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService){}
    
    @Get()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all companies under the user', description: 'This will be used to get a list of companies under the current user'  })
    @ApiResponse({ status: 200, description: 'List of companies fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Request() req,
    ) {
        return this.companiesService.getCompanies(req.user)
    }

    @Get('/explore/search')    
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Explore companies', description: 'This will be used to get a list of companies under the explor page'  })
    @ApiResponse({ status: 200, description: 'List of companies fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    explore(
        @Request() req,
        @Query() paginationDto: PaginationDto
    ) {
        paginationDto.page = Number(paginationDto.page)
        paginationDto.limit = Number(paginationDto.limit)
        return this.companiesService.explore({
            ...paginationDto,
            limit: paginationDto.limit > 10 ? 10: paginationDto.limit
        },req.user)
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get a company profile' , description: 'This will be used to get the a company profile using the ID' })
    @ApiResponse({ status: 200, description: 'User profile fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Request() req,
        @Param() params: ValidParamId,
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
        //return createCompanyDto
        return this.companiesService.createCompany(createCompanyDto)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
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

    @Patch('/:id/registration')
    @ApiOperation({ summary: 'Update a company', description: 'This will be used to update a company profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company details successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    updateRegistration(
        @Param() params: ValidParamId,
        @Body() updateCompanyDto: UpdateCompanyDto
    ){
        return this.companiesService.updateCompanyRegistration(params.id,updateCompanyDto)
    }

    @Patch('/:id/update_mission_vision')
    @ApiOperation({ summary: 'Update a company', description: 'This will be used to update a company VISION AND MISSION details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company details successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update_mission_vision(
        @Param() params: ValidParamId,
        @Body() updateCompanyDto: UpdateCompanyDto
    ){
        return this.companiesService.updateCompanyMissionVision(params.id,updateCompanyDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company', description: 'This will be used to delete a compnay but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Request() req,
        @Param('id') id: string,
        @Param() params: ValidParamId
    ) {
        return this.companiesService.deleteCompany(params.id, req.user)
    }
}
