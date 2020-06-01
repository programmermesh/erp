import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateRiskAnalysisUserDto } from './dto/create-company-risk-analysis-users.dto'

@ApiTags('Company Risk Analysis Users')
@Controller('/companies/:companyId/risk_analysis/:rId/users')

export class CompanyRiskAnalysisUsersController {
    @Get()
    @ApiOperation({ summary: 'Get all company risk analysis users', description: 'This will be used to get a list of company risk analysis users'  })
    @ApiResponse({ status: 200, description: 'List of company risk analysis users fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string,
        @Param('rId') risk_analysisId: string,
    ){
        return { companyId, risk_analysisId }
    }


    @Post()
    @ApiOperation({summary: 'Create a company risk analysis user', description: 'This will be used to create a new company risk analysis user the will be used in the company' })
    @ApiResponse({ status: 200, description: 'Creating new company risk analysis user successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Param('rId') risk_analysisId: string,
        @Body() createRiskAnalysisUserDto: CreateRiskAnalysisUserDto
    ){
        return { companyId, risk_analysisId, createRiskAnalysisUserDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company risk analysis user', description: 'This will be used to update a company risk analysis user details using the ID ' })
    @ApiResponse({ status: 200, description: 'Updating the company risk analysis user successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: string,
        @Param('companyId') companyId: string,
        @Param('rId') risk_analysisId: string,
        @Body() createRiskAnalysisUserDto: CreateRiskAnalysisUserDto
    ){
        return { id, companyId, risk_analysisId, createRiskAnalysisUserDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company risk analysis user', description: 'This will be used to delete a company risk analysis user' })
    @ApiResponse({ status: 200, description: 'Deleting of the company risk analysis user successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('id') id: string,
        @Param('companyId') companyId: string,
        @Param('rId') risk_analysisId: string,
    ){
        return { action: "delete", id, companyId, risk_analysisId }
    }
}
