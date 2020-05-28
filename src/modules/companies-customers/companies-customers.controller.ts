import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCompanyCustomerDto } from './dto/create-company-customer.dto'
import { UpdateCompanyCustomerDto } from './dto/update-company-customer.interface'

@ApiTags('Companies Customers')
@Controller('/companies/:companyId/customers')
export class CompaniesCustomersController {
    @Get()
    @ApiOperation({ summary: 'Get all company customers', description: 'This will be used to get a list of company customers'  })
    @ApiResponse({ status: 200, description: 'List of company customers fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string
    ) {
        return { companyId }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company customer' , description: 'This will be used to get the a company customer using the ID' })
    @ApiResponse({ status: 200, description: 'company customers fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('companyId') companyId: string,
        @Param('id') id: string
    ) {
        return { 
             id,
             companyId
        }
    }

    @Post()
    @ApiOperation({summary: 'Register a company customer', description: 'This will be used to create a new company customer' })
    @ApiResponse({ status: 200, description: 'Creating new company customer successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Body() createCompanyCustomerDto: CreateCompanyCustomerDto
    ) {
        return { companyId, createCompanyCustomerDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company customers', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company customers details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Body() updateCompanyCustomerDto: UpdateCompanyCustomerDto
    ) {
        return { id, companyId, updateCompanyCustomerDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company customer', description: 'This will be used to delete a company customer' })
    @ApiResponse({ status: 200, description: 'Deleting of the company customer successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('id') id: string
    ){
        return { id, companyId }
    }
}
