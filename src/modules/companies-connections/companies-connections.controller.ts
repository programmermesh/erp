import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Company Connections')
@Controller()
export class CompaniesConnectionsController {
    @Get('/companies/:companyId/connections')
    @ApiOperation({ summary: 'Get all company connections', description: 'This will be used to get a list of company connections'  })
    @ApiResponse({ status: 200, description: 'List of company connections fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company connections response data object'
    }

    @Get('/companies/:companyId/connections/:id')
    @ApiOperation({ summary: 'Get a company connection profile' , description: 'This will be used to get the a company connection profile using the ID' })
    @ApiResponse({ status: 200, description: 'company connection profile fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET company connection response data object'
    }

    @Post('/companies/:companyId/connections')
    @ApiOperation({summary: 'Register a company connection', description: 'This will be used to create a new company connection / register' })
    @ApiResponse({ status: 200, description: 'Creating new company connection successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/companies/:companyId/connections/:id')
    @ApiOperation({ summary: 'Update a company connection', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company connection details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company connection response data object'
    }

    @Delete('/companies/:companyId/connections/:id')
    @ApiOperation({ summary: 'Delete a company connection', description: 'This will be used to delete a company connection ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company connection successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company connection response data object'
    }
}

