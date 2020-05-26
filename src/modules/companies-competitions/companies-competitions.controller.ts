import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies Competitions')
@Controller()
export class CompaniesCompetitionsController {
    @Get('/companies/:companyId/competitiors')
    @ApiOperation({ summary: 'Get all company competitiors', description: 'This will be used to get a list of company competitiors'  })
    @ApiResponse({ status: 200, description: 'List of company competitiors fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company competitiors response data object'
    }

    @Get('/companies/:companyId/competitiors/:id')
    @ApiOperation({ summary: 'Get a company competitior' , description: 'This will be used to get the a company competitior using the ID' })
    @ApiResponse({ status: 200, description: 'company competitiors fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET company competitiors response data object'
    }

    @Post('/companies/:companyId/competitiors')
    @ApiOperation({summary: 'Register a company competitior', description: 'This will be used to create a new company competitior' })
    @ApiResponse({ status: 200, description: 'Creating new company competitior successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/companies/:companyId/competitiors/:id')
    @ApiOperation({ summary: 'Update a company competitiors', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company competitiors details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company competitiors response data object'
    }

    @Delete('/companies/:companyId/competitiors/:id')
    @ApiOperation({ summary: 'Delete a company competitior', description: 'This will be used to delete a company competitior' })
    @ApiResponse({ status: 200, description: 'Deleting of the company competitior successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company competitior response data object'
    }
}
