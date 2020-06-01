import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateCustomerSegmentationTypeDto } from './dto/create-customer-segmentation-type.dto'

@ApiTags('Customer Segmentation Types (System Data)')
@Controller('customers_segementation_types')
export class CustomerSegmentationTypeController {
    @Get()
    @ApiOperation({ summary: 'Get all customer segmentation types', description: 'This will be used to get a list of customer segmentation types and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of customer segmentation types fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all customer segmentation types response data object'
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a customer segmentation types' , description: 'This will be used to get the a customer segmentation types using the ID' })
    @ApiResponse({ status: 200, description: 'customer segmentation types fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(@Param('id') id: ValidParamId): string {
        return 'This will replaced with a GET customer segmentation types response data object'
    }

    @Post()
    @ApiOperation({summary: 'Create a customer segmentation type', description: 'This will be used to create a new customer segmentation type the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new customer segmentation type successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Body() createCustomerSegmentationTypeDto: CreateCustomerSegmentationTypeDto
    ) {
        return createCustomerSegmentationTypeDto
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a customer segmentation type', description: 'This will be used to update a customer segmentation type details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the customer segmentation type successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: ValidParamId,
        @Body() updateCustomerSegmentationTypeDto: CreateCustomerSegmentationTypeDto
    ){
        return {id, updateCustomerSegmentationTypeDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a customer segmentation type', description: 'This will be used to delete a customer segmentation type but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the customer segmentation type successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(@Param('id') id: ValidParamId): string {
        return 'This will replaced with a DELETE customer segmentation type response data object'
    }
}
