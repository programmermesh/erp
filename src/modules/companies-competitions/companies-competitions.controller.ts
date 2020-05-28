import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCompanyCompetitorDto } from './dto/create-company-competitor.dto'
import { UpdateCompanyCompetitorDto } from './dto/update-company-competitor.dto'

@ApiTags('Companies Competitions')
@Controller('/companies/:companyId/competitiors')
export class CompaniesCompetitionsController {
    @Get()
    @ApiOperation({ summary: 'Get all company competitiors', description: 'This will be used to get a list of company competitiors'  })
    @ApiResponse({ status: 200, description: 'List of company competitiors fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string 
    ){
        return { companyId }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company competitior' , description: 'This will be used to get the a company competitior using the ID' })
    @ApiResponse({ status: 200, description: 'company competitiors fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('companyId') companyId: string,
        @Param('id') id: string
    ){
        return { id, companyId, data: {} }
    }

    @Post()
    @ApiOperation({summary: 'Register a company competitior', description: 'This will be used to create a new company competitior' })
    @ApiResponse({ status: 200, description: 'Creating new company competitior successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Body() createCompanyCompetitorDto: CreateCompanyCompetitorDto
    ) {
        return{ companyId, createCompanyCompetitorDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company competitiors', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company competitiors details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Body() updateCompanyCompetitorDto: UpdateCompanyCompetitorDto
    ) {
        return { id, companyId, updateCompanyCompetitorDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company competitior', description: 'This will be used to delete a company competitior' })
    @ApiResponse({ status: 200, description: 'Deleting of the company competitior successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('id') id: string
    ) {
        return { id, companyId }
    }
}
