
import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCompanyCustomerSegmentDetailsDetails } from './dto/create-company-customer-segment-details.dto'
import { UpdateCompanyCustomerSegmentDetailsDetails } from './dto/update-company-customer-segment-details.dto'

@ApiTags('Companies Customer segments details ')
@Controller('companies/:companyId/customer_segment/:cs_id:/details')
export class CompaniesCustomerSegmentDetailsController {
    @Get()
    @ApiOperation({ summary: 'Get all company customer segment details ', description: 'This will be used to get a list of company customer segment details and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of company customer segment details fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string,
        @Param('cs_id') customer_segmentsId: string
    ) {
        return { companyId, customer_segmentsId }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company customer segment details' , description: 'This will be used to get the a company customer segment details using the ID' })
    @ApiResponse({ status: 200, description: 'company customer segment details fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('companyId') companyId: string,
        @Param('cs_id') customer_segmentsId: string,
        @Param('id') id: string,
    ){
        return { customer_segmentsId, companyId }
    }

    @Post()
    @ApiOperation({summary: 'Create a company customer segment detail', description: 'This will be used to create a new company customer segment detail the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new company customer segment detail successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Param('cs_id') customer_segmentsId: string,
        @Body() createCompanyCustomerSegmentDetailsDetails: CreateCompanyCustomerSegmentDetailsDetails
    ) {
        return { companyId, customer_segmentsId, createCompanyCustomerSegmentDetailsDetails}
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company customer segment detail', description: 'This will be used to update a company customer segment detail using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the company customer segment detail successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') companyId: string,
        @Param('cs_id') customer_segmentsId: string,
        @Param('id') id: string,
        @Body() updateCompanyCustomerSegmentDetailsDetails: UpdateCompanyCustomerSegmentDetailsDetails
    ){
        return {id, companyId, customer_segmentsId , updateCompanyCustomerSegmentDetailsDetails }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company customer segment detail', description: 'This will be used to delete a company customer segment detail but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company customer segment detail successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('cs_id') customer_segmentsId: string,
        @Param('id') id: string,
    ){
        return { id, companyId, customer_segmentsId }
    }
}