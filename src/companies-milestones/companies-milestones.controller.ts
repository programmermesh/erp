import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Company Milestones')
@Controller()
export class CompaniesMilestonesController {
    @Get('/companies/:companyId/milestones')
    @ApiOperation({ summary: 'Get all company milestones', description: 'This will be used to get a list of company milestones'  })
    @ApiResponse({ status: 200, description: 'List of company milestones fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company milestones response data object'
    }

    @Get('/companies/:companyId/milestones/:id')
    @ApiOperation({ summary: 'Get a company milestone profile' , description: 'This will be used to get the a company milestone profile using the ID' })
    @ApiResponse({ status: 200, description: 'company milestone profile fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET company milestone response data object'
    }

    @Post('/companies/:companyId/milestones')
    @ApiOperation({summary: 'Register a company milestone', description: 'This will be used to create a new company milestone / register' })
    @ApiResponse({ status: 200, description: 'Creating new company milestone successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/companies/:companyId/milestones/:id')
    @ApiOperation({ summary: 'Update a company milestone', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company milestone details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company milestone response data object'
    }

    @Delete('/companies/:companyId/milestones/:id')
    @ApiOperation({ summary: 'Delete a company milestone', description: 'This will be used to delete a company milestone ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company milestone successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company milestone response data object'
    }
}


