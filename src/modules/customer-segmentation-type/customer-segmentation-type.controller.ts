import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateCustomerSegmentationTypeDto } from './dto/create-customer-segmentation-type.dto'
import { CustomerSegmentationTypeService } from './customer-segmentation-type.service'

@ApiTags('Customer Segmentation Types (System Data)')
@Controller('customers_segementation_types')
export class CustomerSegmentationTypeController {
    
    constructor(
        private readonly customerSegmentationTypeService: CustomerSegmentationTypeService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all customer segmentation types', description: 'This will be used to get a list of customer segmentation types and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of customer segmentation types fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get() {
        return this.customerSegmentationTypeService.getAll()
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a customer segmentation types' , description: 'This will be used to get the a customer segmentation types using the ID' })
    @ApiResponse({ status: 200, description: 'customer segmentation types fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId
    ){
        return this.customerSegmentationTypeService.getById(params)
    }

    @Post()
    @ApiOperation({summary: 'Create a customer segmentation type', description: 'This will be used to create a new customer segmentation type the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new customer segmentation type successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Body() createCustomerSegmentationTypeDto: CreateCustomerSegmentationTypeDto
    ) {
        return this.customerSegmentationTypeService.create(createCustomerSegmentationTypeDto)
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a customer segmentation type', description: 'This will be used to update a customer segmentation type details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the customer segmentation type successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Body() updateCustomerSegmentationTypeDto: CreateCustomerSegmentationTypeDto
    ){
        return this.customerSegmentationTypeService.update(
            params,
            updateCustomerSegmentationTypeDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a customer segmentation type', description: 'This will be used to delete a customer segmentation type but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the customer segmentation type successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
    ){
        return this.customerSegmentationTypeService.delete(params)
    }
}
