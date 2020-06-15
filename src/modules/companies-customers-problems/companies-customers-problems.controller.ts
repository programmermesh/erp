import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateCustomerProblemsDto } from './dto/create-company-customer-problem.dto'
import { UpdateCustomerProblemsDto } from './dto/update-company-customer-problem.dto'
import { CompaniesCustomersProblemsService } from './companies-customers-problems.service'

@ApiTags('Companies Customer problems ')
@Controller(
    '/companies/:companyId/customer_segments/:customer_segmentId/customers/:customerId/problems'
)
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesCustomersProblemsController {
    
    constructor(
        private readonly companiesCustomersProblemsService: CompaniesCustomersProblemsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company customer problems ', description: 'This will be used to get a list of company customer problems and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of company customer problems fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesCustomersProblemsService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company customer problems' , description: 'This will be used to get the a company customer problems using the ID' })
    @ApiResponse({ status: 200, description: 'company customer problems fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesCustomersProblemsService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Create a company customer problem', description: 'This will be used to create a new company customer problem the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new company customer problem successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createCustomerProblemsDto: CreateCustomerProblemsDto
    ) {
        return this.companiesCustomersProblemsService.create(
            params,
            req.user,
            createCustomerProblemsDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company customer problem', description: 'This will be used to update a company customer problem using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the company customer problem successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateCustomerProblemsDto: UpdateCustomerProblemsDto
    ){
        return this.companiesCustomersProblemsService.update(
            params,
            req.user,
            updateCustomerProblemsDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company customer problem', description: 'This will be used to delete a company customer problem but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company customer problem successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ){
        this.companiesCustomersProblemsService.delete(params,req.user)
    }
}