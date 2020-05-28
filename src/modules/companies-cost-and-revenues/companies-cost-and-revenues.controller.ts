import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCompanyCostAndRevenuesDto } from './dto/create-company-cost-and-revenue.dto'
import { UpdateCompanyCostAndRevenuesDto } from './dto/update-company-cost-and-revenue.dto'

@ApiTags('Companies Cost and Revenues')
@Controller('/companies/:companyId/costs_and_revenues')
export class CompaniesCostAndRevenuesController {
    @Get()
    @ApiOperation({ summary: 'Get all company cost and revenues', description: 'This will be used to get a list of company cost and revenues'  })
    @ApiResponse({ status: 200, description: 'List of company cost and revenues fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') company_id: string
    ){
        return { company_id }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company cost and revenue' , description: 'This will be used to get the a company cost and revenue using the ID' })
    @ApiResponse({ status: 200, description: 'company cost and revenues fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('companyId') company_id: string,
        @Param('id') id: string
    ) {
        return { id, company_id }
    }

    @Post()
    @ApiOperation({summary: 'Register a company cost and revenues', description: 'This will be used to create a new company cost and revenues' })
    @ApiResponse({ status: 200, description: 'Creating new company cost and revenues successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') company_id: string,
        @Body() createCompanyCostAndRevenuesDto: CreateCompanyCostAndRevenuesDto
    ) {
        return { company_id, createCompanyCostAndRevenuesDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company cost and revenues', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company cost and revenues details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') company_id: string,
        @Param('id') id: string,
        @Body() updateCompanyCostAndRevenuesDto: UpdateCompanyCostAndRevenuesDto
    ) {
        return { id, company_id, updateCompanyCostAndRevenuesDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company cost and revenue', description: 'This will be used to delete a company cost and revenue' })
    @ApiResponse({ status: 200, description: 'Deleting of the company cost and revenue successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') company_id: string,
        @Param('id') id: string
    ) {
        return { id, company_id }
    }
}
