import { Controller, Get, Post, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Company Customer Segments')
@Controller()
export class CompaniesCustomerSegmentsController {
    @Get('/companies/:companyId/companies_customer_segments')
    @ApiOperation({ summary: 'Get all company customer segments', description: 'This will be used to get a list of company customer segments and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of company customer segments fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company customer segments response data object'
    }

    @Post('/companies/:companyId/companies_customer_segments')
    @ApiOperation({summary: 'Create a company customer segment', description: 'This will be used to create a new company customer segment the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new company customer segment successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Delete('/companies/:companyId/companies_customer_segments/:id')
    @ApiOperation({ summary: 'Delete a company customer segment', description: 'This will be used to delete a company customer segment but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company customer segment successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company customer segment response data object'
    }
}
