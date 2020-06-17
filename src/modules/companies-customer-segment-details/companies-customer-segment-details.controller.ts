import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateCompanyCustomerSegmentDetailsDetailsDto } from './dto/create-company-customer-segment-details.dto'
import { UpdateCompanyCustomerSegmentDetailsDetailsDto } from './dto/update-company-customer-segment-details.dto'
import { CompaniesCustomerSegmentDetailsService } from './companies-customer-segment-details.service'

@ApiTags('Companies Customer segments details (SEGMENTATION) ')
@Controller('companies/:companyId/customer_segments/:company_customer_segmentId/segmentations')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesCustomerSegmentDetailsController {
    constructor(
        private readonly companiesCustomerSegmentDetailsService: CompaniesCustomerSegmentDetailsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company customer segment details ', description: 'This will be used to get a list of company customer segment details and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of company customer segment details fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesCustomerSegmentDetailsService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company customer segment details' , description: 'This will be used to get the a company customer segment details using the ID' })
    @ApiResponse({ status: 200, description: 'company customer segment details fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesCustomerSegmentDetailsService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Create a company customer segment detail', description: 'This will be used to create a new company customer segment detail the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new company customer segment detail successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createCompanyCustomerSegmentDetailsDetailsDto: CreateCompanyCustomerSegmentDetailsDetailsDto
    ) {
        return this.companiesCustomerSegmentDetailsService.create(
            params,
            req.user,
            createCompanyCustomerSegmentDetailsDetailsDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company customer segment detail', description: 'This will be used to update a company customer segment detail using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the company customer segment detail successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateCompanyCustomerSegmentDetailsDetailsDto: UpdateCompanyCustomerSegmentDetailsDetailsDto
    ){
        return this.companiesCustomerSegmentDetailsService.update(
            params,
            req.user,
            updateCompanyCustomerSegmentDetailsDetailsDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company customer segment detail', description: 'This will be used to delete a company customer segment detail but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company customer segment detail successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesCustomerSegmentDetailsService.delete(params,req.user)
    }
}