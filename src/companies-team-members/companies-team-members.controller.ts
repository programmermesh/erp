
import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Company Team Memers')
@Controller()
export class CompaniesTeamMembersController {
    @Get('/companies/:companyId/team_members')
    @ApiOperation({ summary: 'Get all company team members', description: 'This will be used to get a list of company team members'  })
    @ApiResponse({ status: 200, description: 'List of company team members fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company team members response data object'
    }

    // @Get('/companies/:companyId/team_members/:id')
    // @ApiOperation({ summary: 'Get a company team members' , description: 'This will be used to get the a company team members using the ID' })
    // @ApiResponse({ status: 200, description: 'company team members fetching successful.'})
    // @ApiResponse({ status: 403, description: 'Forbidden.'})
    // getById(): string {
    //     return 'This will replaced with a GET company team members response data object'
    // }

    @Post('/companies/:companyId/team_members')
    @ApiOperation({summary: 'Create a company team member', description: 'This will be used to create a new company team member the will be used in the company' })
    @ApiResponse({ status: 200, description: 'Creating new company team member successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/companies/:companyId/team_members/:id')
    @ApiOperation({ summary: 'Update a company team member', description: 'This will be used to update a company team member details using the ID ' })
    @ApiResponse({ status: 200, description: 'Updating the company team member successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company team member response data object'
    }

    @Delete('/companies/:companyId/team_members/:id')
    @ApiOperation({ summary: 'Delete a company team member', description: 'This will be used to delete a company team member' })
    @ApiResponse({ status: 200, description: 'Deleting of the company team member successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company team member response data object'
    }
}

