import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCustomerProblemsSolutionsDto } from './dto/create-customer-problem-solution.dto'
import { UpdateCustomerProblemsSolutionsDto } from './dto/update-customer-problem-solution.dto'

@ApiTags('Companies Customer problems solutions ')
@Controller('companies/:companyId/customers/:c_id:/problems/:p_id/solutions')
export class CompaniesCustomersProblemsSolutionsController {
    @Get()
    @ApiOperation({ summary: 'Get all company customer problems solutionss ', description: 'This will be used to get a list of company customer problems solutions and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of company customer problems solutions fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string,
        @Param('c_id') customerId: string,
        @Param('p_id') problemId: string
    ) {
        return { companyId, customerId, problemId }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company customer problems solutions' , description: 'This will be used to get the a company customer problems solutions using the ID' })
    @ApiResponse({ status: 200, description: 'company customer problems solutions fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('companyId') companyId: string,
        @Param('c_id') customerId: string,
        @Param('p_id') problemId: string,
        @Param('id') id: string,
    ){
        return { customerId, companyId , problemId}
    }

    @Post()
    @ApiOperation({summary: 'Create a company customer problems solution', description: 'This will be used to create a new company customer problems solution the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new company customer problems solution successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Param('c_id') customerId: string,
        @Param('p_id') problemId: string,
        @Body() createCustomerProblemsSolutionsDto: CreateCustomerProblemsSolutionsDto
    ) {
        return { companyId, customerId,problemId, createCustomerProblemsSolutionsDto}
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company customer problems solution', description: 'This will be used to update a company customer problems solution using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the company customer problems solution successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') companyId: string,
        @Param('c_id') customerId: string,
        @Param('p_id') problemId: string,
        @Param('id') id: string,
        @Body() updateCustomerProblemsSolutionsDto: UpdateCustomerProblemsSolutionsDto
    ){
        return {id, companyId, customerId ,problemId, updateCustomerProblemsSolutionsDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company customer problems solution', description: 'This will be used to delete a company customer problems solution but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company customer problems solution successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('c_id') customerId: string,
        @Param('p_id') problemId: string,
        @Param('id') id: string,
    ){
        return { id, companyId, customerId, problemId }
    }
}