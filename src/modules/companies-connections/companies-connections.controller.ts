import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCompanyNetworkDto } from './dto/create-company-network.dto'
import { UpdateCompanyNetworkDto } from './dto/update-company-network.dto'

@ApiTags('Company Connections')
@Controller('/companies/:companyId/connections')
export class CompaniesConnectionsController {
    @Get()
    @ApiOperation({ summary: 'Get all company connections', description: 'This will be used to get a list of company connections'  })
    @ApiResponse({ status: 200, description: 'List of company connections fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') company_id: string
    ) {
        return {company_id, data: []}
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company connection profile' , description: 'This will be used to get the a company connection profile using the ID' })
    @ApiResponse({ status: 200, description: 'company connection profile fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('id') id: string,
        @Param('companyId') company_id: string
    ){
        return {id, company_id, data: []}
    }

    @Post()
    @ApiOperation({summary: 'Register a company connection', description: 'This will be used to create a new company connection / register' })
    @ApiResponse({ status: 200, description: 'Creating new company connection successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') company_id: string,
        @Body() createCompanyNetworkDto: CreateCompanyNetworkDto
    ) {
        return {company_id, createCompanyNetworkDto}
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company connection', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company connection details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: string,
        @Param('companyId') company_id: string,
        @Body() updateCompanyNetworkDto: UpdateCompanyNetworkDto
    ) {
        return { id, company_id, updateCompanyNetworkDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company connection', description: 'This will be used to delete a company connection ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company connection successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('id') id: string,
        @Param('companyId') company_id: string
    ) {
        return { id, company_id }
    }
}

