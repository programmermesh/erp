import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../../common/valid-param-id.dto'
import { AuthGuard } from '../../../common/guards'
import { RiskAnalysisService } from './risk-analysis.service'
import { CreateCompanyRiskAnalysisDto } from './dto/create-company-risk-analysis.dto'
import { UpdateCompanyRiskAnalysisDto } from './dto/update-company-risk-analysis.dto'

@ApiTags('Companies Risk Analysis')
@Controller('/companies/:companyId/risk_analysis')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class RiskAnalysisController {

    constructor(
        private readonly riskAnalysisService: RiskAnalysisService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company risk analysis', description: 'This will be used to get a list of company risk analysis'  })
    @ApiResponse({ status: 200, description: 'List of company risk analysis fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Request() req
    ){
        return this.riskAnalysisService.getAll(params,req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company risk analysis profile' , description: 'This will be used to get the a company risk analysis using the ID' })
    @ApiResponse({ status: 200, description: 'company risk analysis profile fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req
    ) {
        return this.riskAnalysisService.getById(params,req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company risk analysis', description: 'This will be used to create a new company risk analysis / register' })
    @ApiResponse({ status: 200, description: 'Creating new company risk analysis successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req,
        @Body() createCompanyRiskAnalysisDto: CreateCompanyRiskAnalysisDto
    ){
        return this.riskAnalysisService.create(
            params,
            req.user,
            createCompanyRiskAnalysisDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company risk analysis', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company risk analysis details successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req,
        @Body() updateCompanyRiskAnalysisDto: UpdateCompanyRiskAnalysisDto
    ){
        return this.riskAnalysisService.update(
            params,
            req.user,
            updateCompanyRiskAnalysisDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company risk analysis', description: 'This will be used to delete a company risk analysis ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company risk analysis successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req
    ) {
        return this.riskAnalysisService.delete(params,req.user)
    }
}
