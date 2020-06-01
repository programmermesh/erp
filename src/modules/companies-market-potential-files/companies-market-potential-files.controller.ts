import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateMarketPotentialsFileDto } from './dto/create-companies-market-potential-files.dto'

@ApiTags('Companies Market Potentials Files')
@Controller('/companies/:companyId/market_potentials/:mpId/files')
export class CompaniesMarketPotentialFilesController {
    @Get()
    @ApiOperation({ summary: 'Get all company market potentials', description: 'This will be used to get a list of company market potential files'  })
    @ApiResponse({ status: 200, description: 'List of company market potential files fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string,
        @Param('mpId') market_potentialId: string
    ) {
        return { companyId, market_potentialId, data: [] }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a company market potential files' , description: 'This will be used to get the a company market potential files using the ID' })
    @ApiResponse({ status: 200, description: 'company market potential files fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('companyId') companyId: string,
        @Param('mpId') market_potentialId: string,
        @Param('id') id: string
    ){
        return { id, companyId, market_potentialId }
    }

    @Post()
    @ApiOperation({summary: 'Register a company market potential files', description: 'This will be used to create a new company market potential files' })
    @ApiResponse({ status: 200, description: 'Creating new company market potential files successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Param('mpId') market_potentialId: string,
        @Body() createMarketPotentialsFileDto: CreateMarketPotentialsFileDto
    ) {
        return { companyId, market_potentialId , createMarketPotentialsFileDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company market potential files', description: 'This will be used to update a Update a company market potential files using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company market potential files details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') companyId: string,
        @Param('mpId') market_potentialId: string,
        @Body() updateMarketPotentialsFileDto: CreateMarketPotentialsFileDto,
        @Param('id') id: string
    ){
        return { id, companyId, market_potentialId, updateMarketPotentialsFileDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company market potential files', description: 'This will be used to delete a company market potential files' })
    @ApiResponse({ status: 200, description: 'Deleting of the company market potential files successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('mpId') market_potentialId: string,
        @Param('id') id: string
    ) {
        return { id, companyId, market_potentialId }
    }
}

