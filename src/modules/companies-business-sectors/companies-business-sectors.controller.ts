import { Controller, Get, Post, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Company Business Sectors')
@Controller()
export class CompaniesBusinessSectorsController {
    @Get('/companies/:companyId/business_sectors')
    @ApiOperation({ summary: 'Get all company business sectors', description: 'This will be used to get a list of company business sectors and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of company business sectors fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company business sectors response data object'
    }

    @Post('/companies/:companyId/business_sectors')
    @ApiOperation({summary: 'Create a company business sector', description: 'This will be used to create a new company business sector the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new company business sector successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Delete('/companies/:companyId/business_sectors/:id')
    @ApiOperation({ summary: 'Delete a company business sector', description: 'This will be used to delete a company business sector but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company business sector successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company business sector response data object'
    }
}