import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Relations (System Data)')
@Controller('relations')
export class RelationsController {
    @Get()
    @ApiOperation({ summary: 'Get all relations', description: 'This will be used to get a list of relations and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of relations fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all relations response data object'
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a relations' , description: 'This will be used to get the a relations using the ID' })
    @ApiResponse({ status: 200, description: 'relations fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET relations response data object'
    }

    @Post()
    @ApiOperation({summary: 'Create a relation', description: 'This will be used to create a new relation the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new relation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a relation', description: 'This will be used to update a relation details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the relation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE relation response data object'
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a relation', description: 'This will be used to delete a relation but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the relation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE relation response data object'
    }
}
