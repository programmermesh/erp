import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateAccessTypeDto } from './dto/create-access-type.dto'
import { UpdateAccessTypeDto } from './dto/update-access-type.dto'

@ApiTags('Access Types (System Data)')
@Controller('access_types')
export class AccessTypesController {
    @Get()
    @ApiOperation({ summary: 'Get all access types', description: 'This will be used to get a list of access types and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of access types fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all access types response data object'
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a access types' , description: 'This will be used to get the a access types using the ID' })
    @ApiResponse({ status: 200, description: 'access types fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('id') id: string 
    ) {
        return { id }
    }

    @Post()
    @ApiOperation({summary: 'Create a access type', description: 'This will be used to create a new access type the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new access type successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Body() createAccessTypeDto: CreateAccessTypeDto
    ){
        return { createAccessTypeDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a access type', description: 'This will be used to update a access type details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the access type successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: string,
        @Body() updateAccessTypeDto: UpdateAccessTypeDto
    ) {
        return { id, updateAccessTypeDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a access type', description: 'This will be used to delete a access type but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the access type successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('id') id: string
    ){
        return { id }
    }
}
