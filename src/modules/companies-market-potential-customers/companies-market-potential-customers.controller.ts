import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateMarketPotentialsCustomerDto } from './dto/create-martket-potential-customer.dto'
import { CompaniesMarketPotentialCustomersService } from './companies-market-potential-customers.service'

@ApiTags('Companies Market Potentials Customers')
@Controller('/companies/:companyId/market_potentials/:market_potentialId/customers')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesMarketPotentialCustomersController {
    
    constructor(
        private readonly companiesMarketPotentialCustomersService: CompaniesMarketPotentialCustomersService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company market potentials customers', description: 'This will be used to get a list of company market potential customers'  })
    @ApiResponse({ status: 200, description: 'List of company market potential customers fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,        
        @Param('companyId') companyId: string,
        @Param('market_potentialId') market_potentialId: string,
        @Request() req
    ) {
        return this.companiesMarketPotentialCustomersService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company market potentials customers', description: 'This will be used to get a company market potential customer by ID'  })
    @ApiResponse({ status: 200, description: 'Get a company market potential customer fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,        
        @Param('companyId') companyId: string,
        @Param('market_potentialId') market_potentialId: string,                
        @Param('id') id: string,
        @Request() req
    ) {
        return this.companiesMarketPotentialCustomersService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company market potential customers', description: 'This will be used to create a new company market potential customers' })
    @ApiResponse({ status: 200, description: 'Creating new company market potential customers successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,        
        @Param('companyId') companyId: string,
        @Param('market_potentialId') market_potentialId: string,  
        @Request() req,
        @Body() createMarketPotentialsCustomerDto: CreateMarketPotentialsCustomerDto
    ) {
        return this.companiesMarketPotentialCustomersService.create(
            params,
            req.user,
            createMarketPotentialsCustomerDto
        )
    }
    
    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company market potential customers', description: 'This will be used to delete a company market potential customers' })
    @ApiResponse({ status: 200, description: 'Deleting of the company market potential customers successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,        
        @Param('companyId') companyId: string,
        @Param('market_potentialId') market_potentialId: string,                
        @Param('id') id: string,
        @Request() req
    ){
        return this.companiesMarketPotentialCustomersService.delete(params,req.user)
    }
}

