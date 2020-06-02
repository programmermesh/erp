import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCustomerProblemsDto } from './dto/create-company-customer-problem.dto'
import { UpdateCustomerProblemsDto } from './dto/update-company-customer-problem.dto'


@ApiTags('Companies Customer problems ')
@Controller('companies/:companyId/customers/:c_id:/problems')
export class CompaniesCustomersProblemsController {
    @Get()
    @ApiOperation({ summary: 'Get all company customer problems ', description: 'This will be used to get a list of company customer problems and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of company customer problems fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string,
        @Param('c_id') customerId: string
    ) {
        return { companyId, customerId }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company customer problems' , description: 'This will be used to get the a company customer problems using the ID' })
    @ApiResponse({ status: 200, description: 'company customer problems fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('companyId') companyId: string,
        @Param('c_id') customerId: string,
        @Param('id') id: string,
    ){
        return { customerId, companyId }
    }

    @Post()
    @ApiOperation({summary: 'Create a company customer problem', description: 'This will be used to create a new company customer problem the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new company customer problem successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Param('c_id') customerId: string,
        @Body() createCustomerProblemsDto: CreateCustomerProblemsDto
    ) {
        return { companyId, customerId, createCustomerProblemsDto}
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company customer problem', description: 'This will be used to update a company customer problem using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the company customer problem successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') companyId: string,
        @Param('c_id') customerId: string,
        @Param('id') id: string,
        @Body() updateCustomerProblemsDto: UpdateCustomerProblemsDto
    ){
        return {id, companyId, customerId , updateCustomerProblemsDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company customer problem', description: 'This will be used to delete a company customer problem but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company customer problem successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('c_id') customerId: string,
        @Param('id') id: string,
    ){
        return { id, companyId, customerId }
    }
}