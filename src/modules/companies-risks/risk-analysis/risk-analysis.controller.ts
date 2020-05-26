import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies Risk Analysis')
@Controller()
export class RiskAnalysisController {
    @Get('/companies/:companyId/risk_analysis')
    @ApiOperation({ summary: 'Get all company risk analysis', description: 'This will be used to get a list of company risk analysis'  })
    @ApiResponse({ status: 200, description: 'List of company risk analysis fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company risk analysis response data object'
    }

    @Get('/companies/:companyId/risk_analysis/:id')
    @ApiOperation({ summary: 'Get a company risk analysis profile' , description: 'This will be used to get the a company risk analysis using the ID' })
    @ApiResponse({ status: 200, description: 'company risk analysis profile fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET company risk analysis response data object'
    }

    @Post('/companies/:companyId/risk_analysis')
    @ApiOperation({summary: 'Register a company risk analysis', description: 'This will be used to create a new company risk analysis / register' })
    @ApiResponse({ status: 200, description: 'Creating new company risk analysis successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/companies/:companyId/risk_analysis/:id')
    @ApiOperation({ summary: 'Update a company risk analysis', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company risk analysis details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company risk analysis response data object'
    }

    @Delete('/companies/:companyId/risk_analysis/:id')
    @ApiOperation({ summary: 'Delete a company risk analysis', description: 'This will be used to delete a company risk analysis ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company risk analysis successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company risk analysis response data object'
    }
}
