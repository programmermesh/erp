import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateMarketPotentialsEstimateCoverageDto } from './dto/create-market-potential-estimate-coverage.dto'
import { UpdateMarketPotentialsEstimateCoverageDto } from './dto/update-market-potential-estimate-coverage.dto'

@ApiTags('Companies Market Potentials Estimates Coverage')
@Controller('/companies/:companyId/market_potentials/:mpId/estimates_coverage')
export class CompaniesMarketPotentialEstimatesCoverageController {
    @Get()
    @ApiOperation({ summary: 'Get all company market potentials estimate coverage', description: 'This will be used to get a list of company market potential estimate coverage'  })
    @ApiResponse({ status: 200, description: 'List of company market potential estimate coverage fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string,
        @Param('mpId') market_potentialId: string
    ) {
        return { companyId, market_potentialId, data: [] }
    }

    @Post()
    @ApiOperation({summary: 'Register a company market potential estimate coverage', description: 'This will be used to create a new company market potential estimate coverage' })
    @ApiResponse({ status: 200, description: 'Creating new company market potential estimate coverage successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Param('mpId') market_potentialId: string,
        @Body() createMarketPotentialsEstimateCoverageDto: CreateMarketPotentialsEstimateCoverageDto
    ) {
        return { companyId, market_potentialId ,createMarketPotentialsEstimateCoverageDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company market potential estimate coverage', description: 'This will be used to update a Update a company market potential estimate coverage using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company market potential estimate coverage details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') companyId: string,
        @Param('mpId') market_potentialId: string,
        @Body() updateMarketPotentialsEstimateCoverageDto: UpdateMarketPotentialsEstimateCoverageDto,
        @Param('id') id: string
    ){
        return { id, companyId, market_potentialId, updateMarketPotentialsEstimateCoverageDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company market potential estimate coverage', description: 'This will be used to delete a company market potential estimate coverage' })
    @ApiResponse({ status: 200, description: 'Deleting of the company market potential estimate coverage successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('mpId') market_potentialId: string,
        @Param('id') id: string
    ) {
        return { id, companyId, market_potentialId }
    }
}

