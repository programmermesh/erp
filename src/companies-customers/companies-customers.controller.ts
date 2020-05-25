import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies Customers')
@Controller()
export class CompaniesCustomersController {
    @Get('/companies/:companyId/customers')
    @ApiOperation({ summary: 'Get all company customers', description: 'This will be used to get a list of company customers'  })
    @ApiResponse({ status: 200, description: 'List of company customers fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company customers response data object'
    }

    @Get('/companies/:companyId/customers/:id')
    @ApiOperation({ summary: 'Get a company customer' , description: 'This will be used to get the a company customer using the ID' })
    @ApiResponse({ status: 200, description: 'company customers fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET company customers response data object'
    }

    @Post('/companies/:companyId/customers')
    @ApiOperation({summary: 'Register a company customer', description: 'This will be used to create a new company customer' })
    @ApiResponse({ status: 200, description: 'Creating new company customer successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/companies/:companyId/customers/:id')
    @ApiOperation({ summary: 'Update a company customers', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company customers details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company customers response data object'
    }

    @Delete('/companies/:companyId/customers/:id')
    @ApiOperation({ summary: 'Delete a company customer', description: 'This will be used to delete a company customer' })
    @ApiResponse({ status: 200, description: 'Deleting of the company customer successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company customer response data object'
    }
}
