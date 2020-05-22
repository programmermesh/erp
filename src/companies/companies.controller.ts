import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
    @Get()
    @ApiOperation({ summary: 'Get all companies', description: 'This will be used to get a list of companies under the current user'  })
    @ApiResponse({ status: 200, description: 'List of companies fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all copmanies response data object'
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company profile' , description: 'This will be used to get the a company profile using the ID' })
    @ApiResponse({ status: 200, description: 'User profile fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET company response data object'
    }

    @Post()
    @ApiOperation({summary: 'Register/Create a company', description: 'This will be used to create a new company the will be user the currently logged in user' })
    @ApiResponse({ status: 200, description: 'Creating new company successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company', description: 'This will be used to update a company profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company response data object'
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company', description: 'This will be used to delete a compnay but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company response data object'
    }
}
