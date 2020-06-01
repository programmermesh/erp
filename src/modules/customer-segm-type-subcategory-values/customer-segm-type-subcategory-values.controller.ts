import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { CreateCustSegTypesSubcategoriesValueDto } from './dto/create-cust-segm-type-subcategory-value.dto'
import { UpdateCustSegTypesSubcategoriesValueDto } from './dto/update-cust-segm-type-subcategory-value.dto'

@ApiTags('Customer Segmentation Types Subcategories Values ')
@Controller('customers_segementation_types/:c_s_id/subcategories/:s_id/values')
export class CustomerSegmTypeSubcategoryValuesController {
    @Get()
    @ApiOperation({ summary: 'Get all customer segmentation types subcategories values ', description: 'This will be used to get a list of customer segmentation types subcategories values and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of customer segmentation types subcategories values fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all customer segmentation types subcategories values response data object'
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a customer segmentation types subcategories values' , description: 'This will be used to get the a customer segmentation types subcategories values using the ID' })
    @ApiResponse({ status: 200, description: 'customer segmentation types subcategories values fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(@Param('id') id: ValidParamId): string {
        return 'This will replaced with a GET customer segmentation types subcategories values response data object'
    }

    @Post()
    @ApiOperation({summary: 'Create a customer segmentation types subcategorie', description: 'This will be used to create a new customer segmentation types subcategorie the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new customer segmentation types subcategorie successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Body() createCustSegTypesSubcategoriesValueDto: CreateCustSegTypesSubcategoriesValueDto
    ) {
        return createCustSegTypesSubcategoriesValueDto
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a customer segmentation types subcategory values', description: 'This will be used to update a customer segmentation types subcategory values details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the customer segmentation types subcategory values successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: ValidParamId,
        @Body() updateCustSegTypesSubcategoriesValueDto: UpdateCustSegTypesSubcategoriesValueDto
    ){
        return {id, updateCustSegTypesSubcategoriesValueDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a customer segmentation types subcategory value', description: 'This will be used to delete a customer segmentation types subcategory value but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the customer segmentation types subcategory value successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(@Param('id') id: ValidParamId): string {
        return 'This will replaced with a DELETE customer segmentation types subcategory value response data object'
    }
}
