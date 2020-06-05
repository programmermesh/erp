import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { CreateBusinessStageDto } from './dto/create-business-stage.dto'
import { UpdateBusinessStageDto } from './dto/update-business-stage.dto'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { BusinessStagesService } from './business-stages.service'

@ApiTags('Business stages (System Data)')
@Controller('business_stages')
export class BusinessStagesController {
    constructor(private readonly businessStagesService: BusinessStagesService){}

    @Get()
    @ApiOperation({ summary: 'Get all business stages', description: 'This will be used to get a list of business stages and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of business stages fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get() {
        return this.businessStagesService.getAll()
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a business stages' , description: 'This will be used to get the a business stages using the ID' })
    @ApiResponse({ status: 200, description: 'business stages fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId
    ){
        return this.businessStagesService.getById(params.id)
    }

    @Post()
    @ApiOperation({summary: 'Create a business stage', description: 'This will be used to create a new business stage the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new business stage successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Body() createBusinessStageDto: CreateBusinessStageDto
    ){
        return this.businessStagesService.create(createBusinessStageDto)
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a business stage', description: 'This will be used to update a business stage details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the business stage successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Body() updateBusinessStageDto: UpdateBusinessStageDto
    ) {
        return this.businessStagesService.update(params.id,updateBusinessStageDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a business stage', description: 'This will be used to delete a business stage but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the business stage successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(@Param() params: ValidParamId){
        return this.businessStagesService.delete(params.id)
    }
}