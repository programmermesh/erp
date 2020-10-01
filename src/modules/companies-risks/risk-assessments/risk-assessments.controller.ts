import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../../common/valid-param-id.dto'
import { AuthGuard } from '../../../common/guards'
import { RiskAssessmentsService } from './risk-assessments.service'
import { CreateRiskAssessmentDto } from './dto/create-risk-assessment.dto'
import { UpdateRiskAssessmentDto } from './dto/update-risk-assessment.dto'

@ApiTags('Companies Risk Assessments')
@Controller('/companies/:companyId/risk_assessments')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class RiskAssessmentsController {
    
    constructor(
        private readonly riskAssessmentsService: RiskAssessmentsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company risk assessment', description: 'This will be used to get a list of company risk assessment'  })
    @ApiResponse({ status: 200, description: 'List of company risk assessment fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Request() req
    ){
        return this.riskAssessmentsService.getAll(params,req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company risk assessment profile' , description: 'This will be used to get the a company risk assessment using the ID' })
    @ApiResponse({ status: 200, description: 'company risk assessment profile fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req
    ) {
        return this.riskAssessmentsService.getById(params,req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company risk assessment', description: 'This will be used to create a new company risk assessment' })
    @ApiResponse({ status: 200, description: 'Creating new company risk assessment successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Request() req,
        @Body() createRiskAssessmentDto: CreateRiskAssessmentDto
    ){
        return this.riskAssessmentsService.create(
            params,
            req.user,
            createRiskAssessmentDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company risk assessment', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company risk assessment details successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req,
        @Body() updateRiskAssessmentDto: UpdateRiskAssessmentDto
    ){
        return this.riskAssessmentsService.update(
            params,
            req.user,
            updateRiskAssessmentDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company risk assessment', description: 'This will be used to delete a company risk assessment ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company risk assessment successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req
    ) {
        return this.riskAssessmentsService.delete(params,req.user)
    }
}

