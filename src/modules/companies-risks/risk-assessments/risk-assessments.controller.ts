import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateRiskAssessmentDto } from './dto/create-risk-assessment.dto'
import { UpdateRiskAssessmentDto } from './dto/update-risk-assessment.dto'

@ApiTags('Companies Risk Assessments')
@Controller('/companies/:companyId/risk_assessments')
export class RiskAssessmentsController {
    @Get()
    @ApiOperation({ summary: 'Get all company risk assessment', description: 'This will be used to get a list of company risk assessment'  })
    @ApiResponse({ status: 200, description: 'List of company risk assessment fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') company_id: string
    ){
        return { company_id, data: [] }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company risk assessment profile' , description: 'This will be used to get the a company risk assessment using the ID' })
    @ApiResponse({ status: 200, description: 'company risk assessment profile fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('id') id: string,
        @Param('companyId') company_id: string
    ) {
        return { id, company_id }
    }

    @Post()
    @ApiOperation({summary: 'Register a company risk assessment', description: 'This will be used to create a new company risk assessment' })
    @ApiResponse({ status: 200, description: 'Creating new company risk assessment successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') company_id: string,
        @Body() createRiskAssessmentDto: CreateRiskAssessmentDto
    ){
        return { company_id, createRiskAssessmentDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company risk assessment', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company risk assessment details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: string,
        @Param('companyId') company_id: string,
        @Body() updateRiskAssessmentDto: UpdateRiskAssessmentDto
    ){
        return { id, company_id, updateRiskAssessmentDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company risk assessment', description: 'This will be used to delete a company risk assessment ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company risk assessment successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('id') id: string,
        @Param('companyId') company_id: string
    ) {
        return { id, company_id }
    }
}

