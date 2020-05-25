import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies Values')
@Controller()
export class CompaniesValuesController {
    @Get('/companies/:companyId/values')
    @ApiOperation({ summary: 'Get all company values', description: 'This will be used to get a list of company values'  })
    @ApiResponse({ status: 200, description: 'List of company values fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company values response data object'
    }

    @Get('/companies/:companyId/values/:id')
    @ApiOperation({ summary: 'Get a company value' , description: 'This will be used to get the a company value using the ID' })
    @ApiResponse({ status: 200, description: 'company values fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET company values response data object'
    }

    @Post('/companies/:companyId/values')
    @ApiOperation({summary: 'Register a company values', description: 'This will be used to create a new company values' })
    @ApiResponse({ status: 200, description: 'Creating new company values successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/companies/:companyId/values/:id')
    @ApiOperation({ summary: 'Update a company values', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company values details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company values response data object'
    }

    @Delete('/companies/:companyId/values/:id')
    @ApiOperation({ summary: 'Delete a company value', description: 'This will be used to delete a company value' })
    @ApiResponse({ status: 200, description: 'Deleting of the company value successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company value response data object'
    }
}
