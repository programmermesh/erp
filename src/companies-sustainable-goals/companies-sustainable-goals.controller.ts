
import { Controller, Get, Post, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Company sustainable goals')
@Controller()
export class CompaniesSustainableGoalsController {
    @Get('/companies/:companyId/companies_sustainable_goals')
    @ApiOperation({ summary: 'Get all company sustainable goals', description: 'This will be used to get a list of company sustainable goals and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of company sustainable goals fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company sustainable goals response data object'
    }

    @Post('/companies/:companyId/companies_sustainable_goals')
    @ApiOperation({summary: 'Create a company sustainable goal', description: 'This will be used to create a new company sustainable goal the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new company sustainable goal successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Delete('/companies/:companyId/companies_sustainable_goals/:id')
    @ApiOperation({ summary: 'Delete a company sustainable goal', description: 'This will be used to delete a company sustainable goal but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company sustainable goal successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company sustainable goal response data object'
    }
}

