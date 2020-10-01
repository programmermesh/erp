import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { CreateCustomerSegTypeSubcategoryDto } from './dto/create-customer-segm-type-subcategory.dto'
import { UpdateCustomerSegTypeSubcategoryDto } from './dto/update-customer-segm-type-subcategory.dto'
import { CustomerSegmTypeSubcategoryService } from './customer-segm-type-subcategory.service'

@ApiTags('Customer Segmentation Types Subcategories (System Data)')
@Controller('customers_segementation_types/:customer_segmentation_typeId/subcategories')
export class CustomerSegmTypeSubcategoryController {
    
    constructor(
        private readonly customerSegmTypeSubcategoryService: CustomerSegmTypeSubcategoryService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all customer segmentation types subcategories', description: 'This will be used to get a list of customer segmentation types subcategories and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of customer segmentation types subcategories fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Param('customer_segmentation_typeId') customer_segmentation_typeId: string
    ) {
        return this.customerSegmTypeSubcategoryService.getAll(params)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a customer segmentation types subcategories' , description: 'This will be used to get the a customer segmentation types subcategories using the ID' })
    @ApiResponse({ status: 200, description: 'customer segmentation types subcategories fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Param('customer_segmentation_typeId') customer_segmentation_typeId: string,
        @Param('id') id: string,
    ){
        return this.customerSegmTypeSubcategoryService.getById(params)
    }

    @Post()
    @ApiOperation({summary: 'Create a customer segmentation types subcategorie', description: 'This will be used to create a new customer segmentation types subcategory the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new customer segmentation types subcategorie successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Body() createCustomerSegTypeSubcategoryDto: CreateCustomerSegTypeSubcategoryDto,
        @Param('customer_segmentation_typeId') customer_segmentation_typeId: string
    ) {
        return this.customerSegmTypeSubcategoryService.create(
            params,
            createCustomerSegTypeSubcategoryDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a customer segmentation types subcategory', description: 'This will be used to update a customer segmentation types subcategory details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the customer segmentation types subcategory successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Body() updateCustomerSegTypeSubcategoryDto: UpdateCustomerSegTypeSubcategoryDto,
        @Param('customer_segmentation_typeId') customer_segmentation_typeId: string,
        @Param('id') id: string,
    ){
        return this.customerSegmTypeSubcategoryService.update(
            params,
            updateCustomerSegTypeSubcategoryDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a customer segmentation types subcategory', description: 'This will be used to delete a customer segmentation types subcategory but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the customer segmentation types subcategory successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Param('customer_segmentation_typeId') customer_segmentation_typeId: string,
        @Param('id') id: string,
    ){
        return this.customerSegmTypeSubcategoryService.delete(params)
    }
}
