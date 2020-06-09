import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { AuthGuard } from '../../common/guards'
import { ValidParamId } from "../../common/valid-param-id.dto"
import { CompaniesCustomerSegmentsService } from './companies-customer-segments.service'
import { CreateCompanyCustomerSegmentDto } from './dto/create-comp-customer-segment.dto'

@ApiTags('Company Customer Segments')
@Controller('/companies/:companyId/customer_segments')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesCustomerSegmentsController {

    constructor(
        private readonly companiesCustomerSegmentsService:CompaniesCustomerSegmentsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company customer segments', description: 'This will be used to get a list of company customer segments '  })
    @ApiResponse({ status: 200, description: 'List of company customer segments fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesCustomerSegmentsService.getAll(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Create a company customer segment', description: 'This will be used to create a new company customer segment ' })
    @ApiResponse({ status: 200, description: 'Creating new company customer segment successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create( 
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createCompanyCustomerSegmentDto: CreateCompanyCustomerSegmentDto
    ){
        return this.companiesCustomerSegmentsService.create(params, req.user, createCompanyCustomerSegmentDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company customer segment', description: 'This will be used to delete a company customer segment ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company customer segment successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesCustomerSegmentsService.delete(params,req.user)
    }
}
