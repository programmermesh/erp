import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompaniesCustomersService } from './companies-customers.service'
import { CreateCompanyCustomerDto } from './dto/create-company-customer.dto'
import { UpdateCompanyCustomerDto } from './dto/update-company-customer.dto'

@ApiTags('Companies Customers')
@Controller('/companies/:companyId/customers')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesCustomersController {
    
    constructor(
        private readonly companiesCustomersService: CompaniesCustomersService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company customers', description: 'This will be used to get a list of company customers'  })
    get(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,        
        @Param('customer_segmentId') customer_segmentId: string,
        @Request() req
    ){
        return this.companiesCustomersService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company customer' , description: 'This will be used to get the a company customer using the ID' })
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesCustomersService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company customer', description: 'This will be used to create a new company customer' })
    create(
        @Param() params: ValidParamId,
        @Request() req,        
        @Body() createCompanyCustomerDto: CreateCompanyCustomerDto
    ) {
        return this.companiesCustomersService.create(params, req.user,createCompanyCustomerDto)
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company customers', description: 'This will be used to update a profile details using the ID' })
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateCompanyCustomerDto: UpdateCompanyCustomerDto
    ) {
        return this.companiesCustomersService.update(params,req.user,updateCompanyCustomerDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company customer', description: 'This will be used to delete a company customer' })
    delete(
        @Param() params: ValidParamId, 
        @Request() req
    ){
        return this.companiesCustomersService.delete(params,req.user)
    }
}
