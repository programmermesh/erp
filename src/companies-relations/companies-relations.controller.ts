
import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies Relations')
@Controller()
export class CompaniesRelationsController {
    @Get('/companies/:companyId/relations')
    @ApiOperation({ summary: 'Get all company relations', description: 'This will be used to get a list of company relations'  })
    @ApiResponse({ status: 200, description: 'List of company relations fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company relations response data object'
    }

    @Get('/companies/:companyId/relations/:id')
    @ApiOperation({ summary: 'Get a company relation' , description: 'This will be used to get the a company relation using the ID' })
    @ApiResponse({ status: 200, description: 'company relations fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET company relations response data object'
    }

    @Post('/companies/:companyId/relations')
    @ApiOperation({summary: 'Post a company relation', description: 'This will be used to create a new company relation' })
    @ApiResponse({ status: 200, description: 'Creating new company relation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/companies/:companyId/relations/:id')
    @ApiOperation({ summary: 'Update a company relations', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company relations details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company relations response data object'
    }

    @Delete('/companies/:companyId/relations/:id')
    @ApiOperation({ summary: 'Delete a company relation', description: 'This will be used to delete a company relation' })
    @ApiResponse({ status: 200, description: 'Deleting of the company relation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company relation response data object'
    }
}
