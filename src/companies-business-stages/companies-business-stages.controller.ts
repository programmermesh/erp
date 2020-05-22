import { Controller, Get, Post, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Company Business Stages')
@Controller()
export class CompaniesBusinessStagesController {
    @Get('/companies/:companyId/companies_business_stages')
    @ApiOperation({ summary: 'Get all company business stages', description: 'This will be used to get a list of company business stages and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of company business stages fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company business stages response data object'
    }

    @Post('/companies/:companyId/companies_business_stages')
    @ApiOperation({summary: 'Create a company business stage', description: 'This will be used to create a new company business stage the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new company business stage successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Delete('/companies/:companyId/companies_business_stages/:id')
    @ApiOperation({ summary: 'Delete a company business stage', description: 'This will be used to delete a company business stage but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company business stage successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company business stage response data object'
    }
}

