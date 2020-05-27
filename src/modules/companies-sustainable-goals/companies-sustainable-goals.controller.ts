
import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCompanySustainableGoalDto } from './dto/create-company-sustainable-goal.dto'
import { UpdateCompanySustainableGoalDto } from './dto/update-company-sustainable-goal.dto'

@ApiTags('Company sustainable goals')
@Controller('/companies/:companyId/companies_sustainable_goals')
export class CompaniesSustainableGoalsController {
    @Get()
    @ApiOperation({ summary: 'Get all company sustainable goals', description: 'This will be used to get a list of company sustainable goals and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of company sustainable goals fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') company_id: string
    ){
        return { company_id }
    }

    @Post()
    @ApiOperation({summary: 'Create a company sustainable goal', description: 'This will be used to create a new company sustainable goal the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new company sustainable goal successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') company_id: string,
        @Body() createCompanySustainableGoalDto: CreateCompanySustainableGoalDto
    ){
        return { company_id, createCompanySustainableGoalDto }
    }

    @Patch('/:id')
    @ApiOperation({summary: 'Update a company sustainable goal', description: 'This will be used to create a new company sustainable goal the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Updating company sustainable goal successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') company_id: string,
        @Param('id') id: string,
        @Body() updateCompanySustainableGoalDto: UpdateCompanySustainableGoalDto
    ){
        return { id, company_id, updateCompanySustainableGoalDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company sustainable goal', description: 'This will be used to delete a company sustainable goal but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company sustainable goal successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('id') id: string,
        @Param('companyId') company_id: string
    ) {
        return { id, company_id }
    }
}

