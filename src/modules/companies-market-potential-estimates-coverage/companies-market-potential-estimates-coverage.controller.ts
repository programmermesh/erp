import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompaniesMarketPotentialEstimatesCoverageService } from './companies-market-potential-estimates-coverage.service'
import { CreateMarketPotentialsEstimateCoverageDto } from './dto/create-market-potential-estimate-coverage.dto'
import { UpdateMarketPotentialsEstimateCoverageDto } from './dto/update-market-potential-estimate-coverage.dto'

@ApiTags('Companies Market Potentials Estimate Coverages')
@Controller('/companies/:companyId/market_potentials/:market_potentialId/estimate_coverages')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesMarketPotentialEstimatesCoverageController {
    
    constructor(
        private readonly companiesMarketPotentialEstimatesCoverageService: CompaniesMarketPotentialEstimatesCoverageService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company market potentials estimate coverage', description: 'This will be used to get a list of company market potential estimate coverage'  })
    @ApiResponse({ status: 200, description: 'List of company market potential estimate coverage fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesMarketPotentialEstimatesCoverageService.getAll(params,req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company market potentials estimate coverage', description: 'This will be used to get a company market potential estimate coverage by ID'  })
    @ApiResponse({ status: 200, description: 'A company market potential estimate coverage fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesMarketPotentialEstimatesCoverageService.getById(params,req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company market potential estimate coverage', description: 'This will be used to create a new company market potential estimate coverage' })
    @ApiResponse({ status: 200, description: 'Creating new company market potential estimate coverage successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createMarketPotentialsEstimateCoverageDto: CreateMarketPotentialsEstimateCoverageDto
    ) {
        return this.companiesMarketPotentialEstimatesCoverageService.create(
            params,
            req.user,
            createMarketPotentialsEstimateCoverageDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company market potential estimate coverage', description: 'This will be used to update a Update a company market potential estimate coverage using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company market potential estimate coverage details successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateMarketPotentialsEstimateCoverageDto: UpdateMarketPotentialsEstimateCoverageDto
    ) {
        return this.companiesMarketPotentialEstimatesCoverageService.update(
            params,
            req.user,
            updateMarketPotentialsEstimateCoverageDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company market potential estimate coverage', description: 'This will be used to delete a company market potential estimate coverage' })
    @ApiResponse({ status: 200, description: 'Deleting of the company market potential estimate coverage successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesMarketPotentialEstimatesCoverageService.delete(params, req.user)
    }
}

