import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateCustomerProblemsSolutionsDto } from './dto/create-customer-problem-solution.dto'
import { UpdateCustomerProblemsSolutionsDto } from './dto/update-customer-problem-solution.dto'
import { CompaniesCustomersProblemsSolutionsService } from './companies-customers-problems-solutions.service'

@ApiTags('Companies Customer problems ')
@Controller(
    '/companies/:companyId/customers/:customerId/problems/:customerProblemId/solutions'
)
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesCustomersProblemsSolutionsController {
    
    constructor(
        private readonly companiesCustomersProblemsSolutionsService: CompaniesCustomersProblemsSolutionsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company customer problems solutionss ', description: 'This will be used to get a list of company customer problems solutions and restricted to super admin only'  })
    get(
        @Param() params: ValidParamId,       
        @Request() req
    ) {
        return this.companiesCustomersProblemsSolutionsService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company customer problems solutions' , description: 'This will be used to get the a company customer problems solutions using the ID' })
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesCustomersProblemsSolutionsService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Create a company customer problems solution', description: 'This will be used to create a new company customer problems solution the will be used in the system but restricted to super admin' })
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createCustomerProblemsSolutionsDto: CreateCustomerProblemsSolutionsDto
    ) {
        return this.companiesCustomersProblemsSolutionsService.create(
            params,
            req.user,
            createCustomerProblemsSolutionsDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company customer problems solution', description: 'This will be used to update a company customer problems solution using the ID but only restricted to the super admin' })
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateCustomerProblemsSolutionsDto: UpdateCustomerProblemsSolutionsDto
    ){
        return this.companiesCustomersProblemsSolutionsService.update(
            params,
            req.user,
            updateCustomerProblemsSolutionsDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company customer problems solution', description: 'This will be used to delete a company customer problems solution but restricted to super admin only' })
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesCustomersProblemsSolutionsService.delete(params,req.user)
    }
}