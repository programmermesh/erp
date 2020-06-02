import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateConnectionGroupsDto } from './dto/create-company-connection-group.dto'
import { UpdateConnectionGroupsDto } from './dto/update-company-connection-group.dto'

@ApiTags('Companies Connection groups ')
@Controller('companies/:companyId/connection_groups')
export class CompaniesConnectionGroupsController {
    @Get()
    @ApiOperation({ summary: 'Get all company connection groups ', description: 'This will be used to get a list of company connection groups and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of company connection groups fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string
    ) {
        return { companyId, data: [] }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company connection groups' , description: 'This will be used to get the a company connection groups using the ID' })
    @ApiResponse({ status: 200, description: 'company connection groups fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('companyId') companyId: string,
        @Param('id') id: string,
    ){
        return { id, companyId }
    }

    @Post()
    @ApiOperation({summary: 'Create a company connection group', description: 'This will be used to create a new company connection group the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new company connection group successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Body() createConnectionGroupsDto: CreateConnectionGroupsDto
    ) {
        return { companyId, createConnectionGroupsDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company connection group', description: 'This will be used to update a company connection group using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the company connection group successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Body() updateConnectionGroupsDto: UpdateConnectionGroupsDto
    ){
        return {id, companyId, updateConnectionGroupsDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company connection group', description: 'This will be used to delete a company connection group but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company connection group successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('id') id: string,
    ){
        return { id, companyId }
    }
}