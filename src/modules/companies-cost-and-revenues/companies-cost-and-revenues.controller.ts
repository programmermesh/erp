import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies Cost and Revenues')
@Controller()
export class CompaniesCostAndRevenuesController {
    @Get('/companies/:companyId/costs_and_revenues')
    @ApiOperation({ summary: 'Get all company cost and revenues', description: 'This will be used to get a list of company cost and revenues'  })
    @ApiResponse({ status: 200, description: 'List of company cost and revenues fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company cost and revenues response data object'
    }

    @Get('/companies/:companyId/costs_and_revenues/:id')
    @ApiOperation({ summary: 'Get a company cost and revenue' , description: 'This will be used to get the a company cost and revenue using the ID' })
    @ApiResponse({ status: 200, description: 'company cost and revenues fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET company cost and revenues response data object'
    }

    @Post('/companies/:companyId/costs_and_revenues')
    @ApiOperation({summary: 'Register a company cost and revenues', description: 'This will be used to create a new company cost and revenues' })
    @ApiResponse({ status: 200, description: 'Creating new company cost and revenues successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/companies/:companyId/costs_and_revenues/:id')
    @ApiOperation({ summary: 'Update a company cost and revenues', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company cost and revenues details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company cost and revenues response data object'
    }

    @Delete('/companies/:companyId/costs_and_revenues/:id')
    @ApiOperation({ summary: 'Delete a company cost and revenue', description: 'This will be used to delete a company cost and revenue' })
    @ApiResponse({ status: 200, description: 'Deleting of the company cost and revenue successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company cost and revenue response data object'
    }
}
