import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { CreateCustomerSegTypeSubcategoryDto } from './dto/create-customer-segm-type-subcategory.dto'
import { UpdateCustomerSegTypeSubcategoryDto } from './dto/update-customer-segm-type-subcategory.dto'

@ApiTags('Customer Segmentation Types Subcategories (System Data)')
@Controller('customers_segementation_types/:id/subcategories')
export class CustomerSegmTypeSubcategoryController {
    @Get()
    @ApiOperation({ summary: 'Get all customer segmentation types subcategories', description: 'This will be used to get a list of customer segmentation types subcategories and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of customer segmentation types subcategories fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all customer segmentation types subcategories response data object'
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a customer segmentation types subcategories' , description: 'This will be used to get the a customer segmentation types subcategories using the ID' })
    @ApiResponse({ status: 200, description: 'customer segmentation types subcategories fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(@Param('id') id: ValidParamId): string {
        return 'This will replaced with a GET customer segmentation types subcategories response data object'
    }

    @Post()
    @ApiOperation({summary: 'Create a customer segmentation types subcategorie', description: 'This will be used to create a new customer segmentation types subcategorie the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new customer segmentation types subcategorie successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Body() createCustomerSegTypeSubcategoryDto: CreateCustomerSegTypeSubcategoryDto
    ) {
        return createCustomerSegTypeSubcategoryDto
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a customer segmentation types subcategory', description: 'This will be used to update a customer segmentation types subcategory details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the customer segmentation types subcategory successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: ValidParamId,
        @Body() updateCustomerSegTypeSubcategoryDto: UpdateCustomerSegTypeSubcategoryDto
    ){
        return {id, updateCustomerSegTypeSubcategoryDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a customer segmentation types subcategorie', description: 'This will be used to delete a customer segmentation types subcategorie but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the customer segmentation types subcategorie successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(@Param('id') id: ValidParamId): string {
        return 'This will replaced with a DELETE customer segmentation types subcategorie response data object'
    }
}
