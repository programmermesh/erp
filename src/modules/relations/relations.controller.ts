import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateRelationDto } from './dto/create-relation.dto'

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
    getById(
        @Param('id') id: string
    ){
        return { id }
    }

    @Post()
    @ApiOperation({summary: 'Create a relation', description: 'This will be used to create a new relation the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new relation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Body() createRelationDto: CreateRelationDto
    ){
        return { createRelationDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a relation', description: 'This will be used to update a relation details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the relation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: string,
        @Body() createRelationDto: CreateRelationDto
    ){
        return { id, createRelationDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a relation', description: 'This will be used to delete a relation but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the relation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('id') id: string
    ) {
        return { id }
    }
}
