import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCompanyRelationDto } from './dto/create-company-relation.dto'

@ApiTags('Companies Relations')
@Controller('/companies/:companyId/relations')
export class CompaniesRelationsController {
    @Get()
    @ApiOperation({ summary: 'Get all company relations', description: 'This will be used to get a list of company relations'  })
    @ApiResponse({ status: 200, description: 'List of company relations fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string
    ){
        return {companyId}
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company relation' , description: 'This will be used to get the a company relation using the ID' })
    @ApiResponse({ status: 200, description: 'company relations fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('companyId') companyId: string,
        @Param('id') id: string 
    ){
        return { id, companyId }
    }

    @Post()
    @ApiOperation({summary: 'Post a company relation', description: 'This will be used to create a new company relation' })
    @ApiResponse({ status: 200, description: 'Creating new company relation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Body() createCompanyRelationDto: CreateCompanyRelationDto 
    ){
        return { companyId, createCompanyRelationDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company relations', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company relations details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Body() createCompanyRelationDto: CreateCompanyRelationDto 
    ){
        return {id, companyId, createCompanyRelationDto}
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company relation', description: 'This will be used to delete a company relation' })
    @ApiResponse({ status: 200, description: 'Deleting of the company relation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('id') id: string 
    ) {
        return { id, companyId }
    }
}
