import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCompanyPitchDeckDto } from './dto/create-company-pitch-deck.dto'
import { UpdateCompanyPitchDeckDto } from './dto/update-company-pitch-deck.dto'

@ApiTags('Companies Pitch Decks')
@Controller('/companies/:companyId/pitch_decks')
export class CompaniesPitchDecksController {
    @Get()
    @ApiOperation({ summary: 'Get all company pitch decks', description: 'This will be used to get a list of company pitch decks'  })
    @ApiResponse({ status: 200, description: 'List of company pitch decks fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') company_id: string,
        @Param('id') id: string
    ) {
        return { id, company_id, data: [] }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company pitch decks profile' , description: 'This will be used to get the a company pitch decks using the ID' })
    @ApiResponse({ status: 200, description: 'company pitch decks profile fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('companyId') company_id: string,
        @Param('id') id: string
    ){
        return { id, company_id }
    }

    @Post()
    @ApiOperation({summary: 'Register a company pitch decks', description: 'This will be used to create a new company pitch decks' })
    @ApiResponse({ status: 200, description: 'Creating new company pitch decks successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') company_id: string,
        @Body() createCompanyPitchDeckDto: CreateCompanyPitchDeckDto
    ) {
        return { company_id, createCompanyPitchDeckDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company pitch decks', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company pitch decks details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') company_id: string,
        @Param('id') id: string,
        @Body() updateCompanyPitchDeckDto: UpdateCompanyPitchDeckDto
    ){
        return { id, company_id, updateCompanyPitchDeckDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company pitch decks', description: 'This will be used to delete a company pitch decks ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company pitch decks successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') company_id: string,
        @Param('id') id: string
    ) {
        return { id, company_id }
    }
}
