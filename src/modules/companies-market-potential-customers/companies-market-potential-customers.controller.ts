import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateMarketPotentialsCustomerDto } from './dto/create-martket-potential-customer.dto'

@ApiTags('Companies Market Potentials Customers')
@Controller('/companies/:companyId/market_potentials/:mpId/customers')
export class CompaniesMarketPotentialCustomersController {
    @Get()
    @ApiOperation({ summary: 'Get all company market potentials customers', description: 'This will be used to get a list of company market potential customers'  })
    @ApiResponse({ status: 200, description: 'List of company market potential customers fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string,
        @Param('mpId') market_potentialId: string
    ) {
        return { companyId, market_potentialId, data: [] }
    }

    @Post()
    @ApiOperation({summary: 'Register a company market potential customers', description: 'This will be used to create a new company market potential customers' })
    @ApiResponse({ status: 200, description: 'Creating new company market potential customers successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Param('mpId') market_potentialId: string,
        @Body() createMarketPotentialsCustomerDto: CreateMarketPotentialsCustomerDto
    ) {
        return { companyId, market_potentialId , createMarketPotentialsCustomerDto }
    }
    
    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company market potential customers', description: 'This will be used to delete a company market potential customers' })
    @ApiResponse({ status: 200, description: 'Deleting of the company market potential customers successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('mpId') market_potentialId: string,
        @Param('id') id: string
    ) {
        return { id, companyId, market_potentialId }
    }
}

