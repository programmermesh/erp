import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CustomerSegmentationsService } from './customer-segmentations.service'
import { CreateCustomerSegmentationDto } from './dto/createDto'
import { UpdateCustomerSegmentationDto } from './dto/updateDto'

@ApiTags('Customers Segmentations')
@Controller('/companies/:companyId/customers/:customerId/segmentations')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CustomerSegmentationsController {
    
    constructor(
        private readonly customerSegmentationsService: CustomerSegmentationsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all customer segmentation', description: 'This will be used to get a list of company customers'  })
    get(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.customerSegmentationsService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a customer segmentation' , description: 'This will be used to get the a customer segmentation using the ID' })
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.customerSegmentationsService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a customer segmentation', description: 'This will be used to create a customer segmentation' })
    create(
        @Param() params: ValidParamId,
        @Request() req,        
        @Body() createCustomerSegmentationDto: CreateCustomerSegmentationDto
    ) {
        return this.customerSegmentationsService.create(params, req.user,createCustomerSegmentationDto)
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a customer segmentation', description: 'This will be used to update' })
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateCustomerSegmentationDto: UpdateCustomerSegmentationDto
    ) {
        return this.customerSegmentationsService.update(params,req.user,updateCustomerSegmentationDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a customer segmentation', description: 'This will be used to delete ' })
    delete(
        @Param() params: ValidParamId, 
        @Request() req
    ){
        return this.customerSegmentationsService.delete(params,req.user)
    }
}
