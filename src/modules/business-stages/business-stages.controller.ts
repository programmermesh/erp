import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateBusinessStageDto } from './dto/create-business-stage.dto'
import { UpdateBusinessStageDto } from './dto/update-business-stage.dto'
import { ValidParamId } from '../../common/valid-param-id.dto'

@ApiTags('Business stasges (System Data)')
@Controller('business_stages')
export class BusinessStagesController {
    @Get()
    @ApiOperation({ summary: 'Get all business stages', description: 'This will be used to get a list of business stages and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of business stages fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all business stages response data object'
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a business stages' , description: 'This will be used to get the a business stages using the ID' })
    @ApiResponse({ status: 200, description: 'business stages fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('id') id: string
    ){
        return {id}
    }

    @Post()
    @ApiOperation({summary: 'Create a business stage', description: 'This will be used to create a new business stage the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new business stage successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Body() createBusinessStageDto: CreateBusinessStageDto
    ){
        return { createBusinessStageDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a business stage', description: 'This will be used to update a business stage details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the business stage successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: string,
        @Body() updateBusinessStageDto: UpdateBusinessStageDto
    ) {
        return {id, updateBusinessStageDto}
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a business stage', description: 'This will be used to delete a business stage but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the business stage successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(@Param('id') id: string){
        return {id}
    }
}