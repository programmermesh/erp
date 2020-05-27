
import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCompanyTeamMemberDto } from './dto/create-company-team-member.dto'
import { UpdateCompanyTeamMemberDto } from './dto/update-company-team-member.dto'

@ApiTags('Company Team Memers')
@Controller('/companies/:companyId/team_members')
export class CompaniesTeamMembersController {
    @Get()
    @ApiOperation({ summary: 'Get all company team members', description: 'This will be used to get a list of company team members'  })
    @ApiResponse({ status: 200, description: 'List of company team members fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company team members response data object'
    }

    // @Get('/:id')
    // @ApiOperation({ summary: 'Get a company team members' , description: 'This will be used to get the a company team members using the ID' })
    // @ApiResponse({ status: 200, description: 'company team members fetching successful.'})
    // @ApiResponse({ status: 403, description: 'Forbidden.'})
    // getById(): string {
    //     return 'This will replaced with a GET company team members response data object'
    // }

    @Post()
    @ApiOperation({summary: 'Create a company team member', description: 'This will be used to create a new company team member the will be used in the company' })
    @ApiResponse({ status: 200, description: 'Creating new company team member successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Body() createCompanyTeamMemberDto: CreateCompanyTeamMemberDto
    ){
        return {createCompanyTeamMemberDto}
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company team member', description: 'This will be used to update a company team member details using the ID ' })
    @ApiResponse({ status: 200, description: 'Updating the company team member successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: string,
        @Param('companyId') company_id: string,
        @Body() updateCompanyTeamMemberDto: UpdateCompanyTeamMemberDto
    ){
        return { id, company_id, updateCompanyTeamMemberDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company team member', description: 'This will be used to delete a company team member' })
    @ApiResponse({ status: 200, description: 'Deleting of the company team member successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('id') id: string,
        @Param('companyid') company_id: string
    ){
        return { id, company_id }
    }
}

