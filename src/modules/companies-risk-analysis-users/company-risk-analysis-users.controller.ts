import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateRiskAnalysisUserDto } from './dto/create-company-risk-analysis-users.dto'
import { CompanyRiskAnalysisUsersService } from './company-risk-analysis-users.service'

@ApiTags('Company Risk Analysis Users')
@Controller('/companies/:companyId/risk_analysis/:risk_analysisId/users')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompanyRiskAnalysisUsersController {
    
    constructor(
        private readonly companyRiskAnalysisUsersService: CompanyRiskAnalysisUsersService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company risk analysis users', description: 'This will be used to get a list of company risk analysis users'  })
    @ApiResponse({ status: 200, description: 'List of company risk analysis users fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,                
        @Param('risk_analysisId') risk_analysisId: string,
        @Request() req
    ) {
        return this.companyRiskAnalysisUsersService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company risk analysis user', description: 'This will be used to get a company risk analysis user'  })
    @ApiResponse({ status: 200, description: 'Getting a company risk analysis user fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,                
        @Param('risk_analysisId') risk_analysisId: string,
        @Param('id') id: string,
        @Request() req
    ) {
        return this.companyRiskAnalysisUsersService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Create a company risk analysis user', description: 'This will be used to create a new company risk analysis user the will be used in the company' })
    @ApiResponse({ status: 200, description: 'Creating new company risk analysis user successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,                
        @Param('risk_analysisId') risk_analysisId: string,
        @Request() req,
        @Body() createRiskAnalysisUserDto: CreateRiskAnalysisUserDto
    ) {
        return this.companyRiskAnalysisUsersService.create(
            params,
            req.user,
            createRiskAnalysisUserDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company risk analysis user', description: 'This will be used to delete a company risk analysis user' })
    @ApiResponse({ status: 200, description: 'Deleting of the company risk analysis user successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,                
        @Param('risk_analysisId') risk_analysisId: string,
        @Param('id') id: string,
        @Request() req
    ){
        return this.companyRiskAnalysisUsersService.delete(params,req.user)
    }
}
