import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies Risk Assessments')
@Controller()
export class RiskAssessmentsController {
    @Get('/companies/:companyId/risk_assessments')
    @ApiOperation({ summary: 'Get all company risk assessment', description: 'This will be used to get a list of company risk assessment'  })
    @ApiResponse({ status: 200, description: 'List of company risk assessment fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company risk assessment response data object'
    }

    @Get('/companies/:companyId/risk_assessments/:id')
    @ApiOperation({ summary: 'Get a company risk assessment profile' , description: 'This will be used to get the a company risk assessment using the ID' })
    @ApiResponse({ status: 200, description: 'company risk assessment profile fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET company risk assessment response data object'
    }

    @Post('/companies/:companyId/risk_assessments')
    @ApiOperation({summary: 'Register a company risk assessment', description: 'This will be used to create a new company risk assessment' })
    @ApiResponse({ status: 200, description: 'Creating new company risk assessment successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/companies/:companyId/risk_assessments/:id')
    @ApiOperation({ summary: 'Update a company risk assessment', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company risk assessment details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company risk assessment response data object'
    }

    @Delete('/companies/:companyId/risk_assessments/:id')
    @ApiOperation({ summary: 'Delete a company risk assessment', description: 'This will be used to delete a company risk assessment ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company risk assessment successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company risk assessment response data object'
    }
}

