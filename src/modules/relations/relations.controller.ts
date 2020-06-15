import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { CreateRelationDto } from './dto/create-relation.dto'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { RelationsService } from './relations.service'

@ApiTags('Relations (System Data)')
@Controller('relations')
export class RelationsController {
    constructor(
        private readonly relationsService: RelationsService
    ){}
    @Get()
    @ApiOperation({ summary: 'Get all relations', description: 'This will be used to get a list of relations and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of relations fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(){
        return this.relationsService.getAll()
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a relations' , description: 'This will be used to get the a relations using the ID' })
    @ApiResponse({ status: 200, description: 'relations fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId
    ) {
        return this.relationsService.getById(params)
    }

    @Post()
    @ApiOperation({summary: 'Create a relation', description: 'This will be used to create a new relation the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new relation successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Body() createRelationDto: CreateRelationDto
    ){
        return this.relationsService.create(createRelationDto)
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a relation', description: 'This will be used to update a relation details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the relation successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Body() updateRelationDto: CreateRelationDto
    ){
        return this.relationsService.update(params, updateRelationDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a relation', description: 'This will be used to delete a relation but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the relation successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(@Param() params: ValidParamId) {
        return this.relationsService.delete(params)
    }
}
