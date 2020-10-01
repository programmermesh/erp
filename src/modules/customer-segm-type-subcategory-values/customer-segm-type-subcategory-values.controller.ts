import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateCustSegTypesSubcategoriesValueDto } from './dto/create-cust-segm-type-subcategory-value.dto'
import { UpdateCustSegTypesSubcategoriesValueDto } from './dto/update-cust-segm-type-subcategory-value.dto'
import { CustomerSegmTypeSubcategoryValuesService } from './customer-segm-type-subcategory-values.service'

@ApiTags('Customer Segmentation Types Subcategories Values ')
@Controller('companies/:companyId/customer_segments/:company_customer_segmentId/segmentations/:segmentationId/details')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CustomerSegmTypeSubcategoryValuesController {
    constructor(
        private readonly customerSegmTypeSubcategoryValuesService: CustomerSegmTypeSubcategoryValuesService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all customer segmentation types subcategories values ', description: 'This will be used to get a list of customer segmentation types subcategories values and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of customer segmentation types subcategories values fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Param('companyId') customer_segmentation_typeId: string,
        @Param('company_customer_segmentId') company_customer_segmentId: string,
        @Param('segmentationId') segmentationId: string,
        @Request() req
    ) {
        return this.customerSegmTypeSubcategoryValuesService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a customer segmentation types subcategories values' , description: 'This will be used to get the a customer segmentation types subcategories values using the ID' })
    @ApiResponse({ status: 200, description: 'customer segmentation types subcategories values fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Param('companyId') customer_segmentation_typeId: string,
        @Param('company_customer_segmentId') company_customer_segmentId: string,
        @Param('segmentationId') segmentationId: string,
        @Param('id') id: string,
        @Request() req
    ){
        return this.customerSegmTypeSubcategoryValuesService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Create a customer segmentation types subcategorie', description: 'This will be used to create a new customer segmentation types subcategorie the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new customer segmentation types subcategorie successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Param('companyId') customer_segmentation_typeId: string,
        @Param('company_customer_segmentId') company_customer_segmentId: string,
        @Param('segmentationId') segmentationId: string,
        @Request() req,
        @Body() createCustSegTypesSubcategoriesValueDto: CreateCustSegTypesSubcategoriesValueDto
    ) {
        return this.customerSegmTypeSubcategoryValuesService.create(
            params,
            req.user,
            createCustSegTypesSubcategoriesValueDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a customer segmentation types subcategory values', description: 'This will be used to update a customer segmentation types subcategory values details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the customer segmentation types subcategory values successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Param('companyId') customer_segmentation_typeId: string,
        @Param('company_customer_segmentId') company_customer_segmentId: string,
        @Param('segmentationId') segmentationId: string,
        @Param('id') id: string,
        @Request() req,
        @Body() updateCustSegTypesSubcategoriesValueDto: UpdateCustSegTypesSubcategoriesValueDto
    ){
        return this.customerSegmTypeSubcategoryValuesService.update(
            params,
            req.user,
            updateCustSegTypesSubcategoriesValueDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a customer segmentation types subcategory value', description: 'This will be used to delete a customer segmentation types subcategory value but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the customer segmentation types subcategory value successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Param('companyId') customer_segmentation_typeId: string,
        @Param('company_customer_segmentId') company_customer_segmentId: string,
        @Param('segmentationId') segmentationId: string,
        @Param('id') id: string,
        @Request() req
    ){
        return this.customerSegmTypeSubcategoryValuesService.delete(params,req.user)
    }
}
