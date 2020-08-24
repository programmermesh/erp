
import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { AuthGuard } from '../../common/guards'
import { ValidParamId } from 'src/common/valid-param-id.dto';
import { CompaniesTeamMembersService } from './companies-team-members.service'
import { CreateCompanyTeamMemberDto } from './dto/create-company-team-member.dto'
import { UpdateCompanyTeamMemberDto } from './dto/update-company-team-member.dto'
import { SearchDto } from './dto/search.dto';

@ApiTags('Company Team Members')
@Controller('/companies/:companyId/team_members')
export class CompaniesTeamMembersController {

    constructor(
        private readonly companiesTeamMembersService: CompaniesTeamMembersService
    ){}

    @Get()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all company team members', description: 'This will be used to get a list of company team members'  })
    @ApiResponse({ status: 200, description: 'List of company team members fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Request() req,
        @Query() searchDto: SearchDto
    ) {
        return this.companiesTeamMembersService.getAll(params, searchDto, req.user)
    }

    // @Get('/:id')
    // @ApiOperation({ summary: 'Get a company team members' , description: 'This will be used to get the a company team members using the ID' })
    // @ApiResponse({ status: 200, description: 'company team members fetching successful.'})
    // @ApiResponse({ status: 401, description: 'Unauthorized'})
    // getById(): string {
    //     return 'This will replaced with a GET company team members response data object'
    // }

    @Get('/:id/invitation')
    getInvitation(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
    ){
        return this.companiesTeamMembersService.getInvitationById(params)
    }

    @Post()    
    //@UseGuards(AuthGuard)
    //@ApiBearerAuth()
    @ApiOperation({summary: 'Create a company team member', description: 'This will be used to create a new company team member the will be used in the company' })
    @ApiResponse({ status: 200, description: 'Creating new company team member successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        //@Request() req,
        @Body() createCompanyTeamMemberDto: CreateCompanyTeamMemberDto
    ){
        //return this.companiesTeamMembersService.create(params, req.user, createCompanyTeamMemberDto)
        return this.companiesTeamMembersService.create(params, createCompanyTeamMemberDto)
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a company team member', description: 'This will be used to update a company team member details using the ID ' })
    @ApiResponse({ status: 200, description: 'Updating the company team member successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req,
        @Body() updateCompanyTeamMemberDto: UpdateCompanyTeamMemberDto
    ){
        return this.companiesTeamMembersService.update(
            params,
            req.user,
            updateCompanyTeamMemberDto
        )
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a company team member', description: 'This will be used to delete a company team member' })
    @ApiResponse({ status: 200, description: 'Deleting of the company team member successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req,
    ){
        return this.companiesTeamMembersService.delete(params, req.user)
    }
}

