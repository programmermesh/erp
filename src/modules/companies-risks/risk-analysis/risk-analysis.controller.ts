import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCompanyRiskAnalysisDto } from './dto/create-company-risk-analysis.dto'
import { UpdateCompanyRiskAnalysisDto } from './dto/update-company-risk-analysis.dto'

@ApiTags('Companies Risk Analysis')
@Controller('/companies/:companyId/risk_analysis')
export class RiskAnalysisController {
    @Get()
    @ApiOperation({ summary: 'Get all company risk analysis', description: 'This will be used to get a list of company risk analysis'  })
    @ApiResponse({ status: 200, description: 'List of company risk analysis fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company risk analysis response data object'
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company risk analysis profile' , description: 'This will be used to get the a company risk analysis using the ID' })
    @ApiResponse({ status: 200, description: 'company risk analysis profile fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('id') id: string,
        @Param('companyId') company_id: string
    ): string {
        return 'This will replaced with a GET company risk analysis response data object'
    }

    @Post()
    @ApiOperation({summary: 'Register a company risk analysis', description: 'This will be used to create a new company risk analysis / register' })
    @ApiResponse({ status: 200, description: 'Creating new company risk analysis successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') company_id: string,
        @Body() createCompanyRiskAnalysisDto: CreateCompanyRiskAnalysisDto
    ){
        return { company_id, createCompanyRiskAnalysisDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company risk analysis', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company risk analysis details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: string,
        @Param('companyId') company_id: string,
        @Body() updateCompanyRiskAnalysisDto: UpdateCompanyRiskAnalysisDto
    ) {
        return { id, company_id, updateCompanyRiskAnalysisDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company risk analysis', description: 'This will be used to delete a company risk analysis ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company risk analysis successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('id') id: string,
        @Param('companyId') company_id: string
    ) {
        return { id, company_id }
    }
}
