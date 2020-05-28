import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateMarketPotentialDto } from './dto/create-market-potential.dto'
import { UpdateMarketPotentialDto } from './dto/update-market-potential.dto'

@ApiTags('Companies Market Potentials')
@Controller('/companies/:companyId/market_potentials')
export class CompaniesMarketPotentialsController {
    @Get()
    @ApiOperation({ summary: 'Get all company market potentials', description: 'This will be used to get a list of company market potentials'  })
    @ApiResponse({ status: 200, description: 'List of company market potentials fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string
    ) {
        return { companyId, data: [] }
    }

    @Get('/companies/:companyId/market_potentials/:id')
    @ApiOperation({ summary: 'Get a company market potential' , description: 'This will be used to get the a company market potential using the ID' })
    @ApiResponse({ status: 200, description: 'company market potentials fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('companyId') companyId: string,
        @Param('id') id: string
    ){
        return { id, companyId }
    }

    @Post()
    @ApiOperation({summary: 'Register a company market potential', description: 'This will be used to create a new company market potential' })
    @ApiResponse({ status: 200, description: 'Creating new company market potential successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Body() createMarketPotentialDto: CreateMarketPotentialDto
    ) {
        return { companyId, createMarketPotentialDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company market potentials', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company market potentials details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Body() updateMarketPotentialDto: UpdateMarketPotentialDto
    ){
        return { id, companyId, updateMarketPotentialDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company market potential', description: 'This will be used to delete a company market potential' })
    @ApiResponse({ status: 200, description: 'Deleting of the company market potential successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('id') id: string
    ) {
        return { id, companyId }
    }
}
