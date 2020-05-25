import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies Lead List')
@Controller()
export class CompaniesLeadListController {
    @Get('/companies/:companyId/lead_list')
    @ApiOperation({ summary: 'Get all company lead list', description: 'This will be used to get a list of company lead list'  })
    @ApiResponse({ status: 200, description: 'List of company lead list fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company lead list response data object'
    }

    @Get('/companies/:companyId/lead_list/:id')
    @ApiOperation({ summary: 'Get a company lead list profile' , description: 'This will be used to get the a company lead list using the ID' })
    @ApiResponse({ status: 200, description: 'company lead list profile fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET company lead list response data object'
    }

    @Post('/companies/:companyId/lead_list')
    @ApiOperation({summary: 'Register a company lead list', description: 'This will be used to create a new company lead list' })
    @ApiResponse({ status: 200, description: 'Creating new company lead list successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/companies/:companyId/lead_list/:id')
    @ApiOperation({ summary: 'Update a company lead list', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company lead list details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company lead list response data object'
    }

    @Delete('/companies/:companyId/lead_list/:id')
    @ApiOperation({ summary: 'Delete a company lead list', description: 'This will be used to delete a company lead list ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company lead list successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company lead list response data object'
    }
}
