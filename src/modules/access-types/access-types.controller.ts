import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { CreateAccessTypeDto } from './dto/create-access-type.dto'
import { UpdateAccessTypeDto } from './dto/update-access-type.dto'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { AccessTypesService } from './access-types.service'

@ApiTags('Access Types (System Data)')
@Controller('access_types')
export class AccessTypesController {
    constructor(private readonly accessTypeService: AccessTypesService){}

    @Get()
    @ApiOperation({ summary: 'Get all access types', description: 'This will be used to get a list of access types and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of access types fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get() {
        return this.accessTypeService.getAll()
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a access types' , description: 'This will be used to get the a access types using the ID' })
    @ApiResponse({ status: 200, description: 'access types fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId
    ) {
        return this.accessTypeService.getById(params.id)
    }

    @Post()
    @ApiOperation({summary: 'Create a access type', description: 'This will be used to create a new access type the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new access type successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Body() createAccessTypeDto: CreateAccessTypeDto
    ){
        return this.accessTypeService.create(createAccessTypeDto)
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a access type', description: 'This will be used to update a access type details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the access type successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Body() updateAccessTypeDto: UpdateAccessTypeDto
    ) {
        return this.accessTypeService.update(params.id, updateAccessTypeDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a access type', description: 'This will be used to delete a access type but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the access type successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId
    ){
        return this.accessTypeService.delete(params.id)
    }
}
