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
    get(
        @Request() req,
    ) {
        return this.companiesService.getCompanies(req.user)
    }

    @Get('/user/team-member')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all companies the current user is a team member in', description: 'This will return a list of companies a user is a team member in'  })
    getTeamCompanies(
        @Request() req,
    ) {
        return this.companiesService.getTeamCompanies(req.user)
    }

    @Get('/my/invitations')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all pending team membership invitations', description: 'This will return a list of all pending team membership invitations'  })
    getMyPendingInvitations(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesService.getMyPendingInvitations(req.user)
    }

    @Get('/explore/search')    
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Explore companies', description: 'This will be used to get a list of companies under the explor page'  })
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
    getById(
        @Request() req,
        @Param() params: ValidParamId,
    ) {
        return this.companiesService.getCompanyById(params.id, req.user)
    }

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Register/Create a company', description: 'This will be used to create a new company the will be user the currently logged in user' })
    create(
        @Request() req,
        @Body() createCompanyDto: CreateCompanyDto
    ){
        return this.companiesService.createCompany(createCompanyDto, req.user)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company', description: 'This will be used to update a company profile details using the ID' })
    update(
        @Request() req,
        @Param() params: ValidParamId,
        @Body() updateCompanyDto: UpdateCompanyDto
    ){
        return this.companiesService.updateCompany(params.id,updateCompanyDto,req.user)
    }

    @Patch('/:id/registration')
    @ApiOperation({ summary: 'Update a company', description: 'This will be used to update a company profile details using the ID' })
    updateRegistration(
        @Param() params: ValidParamId,
        @Body() updateCompanyDto: UpdateCompanyDto
    ){
        return this.companiesService.updateCompanyRegistration(params.id,updateCompanyDto)
    }

    @Patch('/:id/update_mission_vision')
    @ApiOperation({ summary: 'Update a company', description: 'This will be used to update a company VISION AND MISSION details using the ID' })
    update_mission_vision(
        @Param() params: ValidParamId,
        @Body() updateCompanyDto: UpdateCompanyDto
    ){
        return this.companiesService.updateCompanyMissionVision(params.id,updateCompanyDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company', description: 'This will be used to delete a compnay but restricted to super admin only' })
    delete(
        @Request() req,
        @Param() params: ValidParamId
    ) {
        return this.companiesService.deleteCompany(params.id, req.user)
    }
}
