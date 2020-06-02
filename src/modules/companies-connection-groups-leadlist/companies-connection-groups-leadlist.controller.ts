import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateConnectionGroupsLeadListDto } from './dto/create-company-connection-group-leadlist.dto'

@ApiTags('Companies Connection groups leadlist ')
@Controller('companies/:companyId/connection_groups/:conn_groupId/leadlist')
export class CompaniesConnectionGroupsLeadlistController {
    @Get()
    @ApiOperation({ summary: 'Get all company connection group leadlists ', description: 'This will be used to get a list of company connection group leadlists and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of company connection group leadlists fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string,
        @Param('conn_groupId') connection_groupId: string
    ) {
        return { companyId, connection_groupId , data: [] }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company connection group leadlists' , description: 'This will be used to get the a company connection group leadlists using the ID' })
    @ApiResponse({ status: 200, description: 'company connection group leadlists fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('companyId') companyId: string,
        @Param('conn_groupId') connection_groupId: string,
        @Param('id') id: string,
    ){
        return { id, companyId, connection_groupId }
    }

    @Post()
    @ApiOperation({summary: 'Create a company connection group leadlist', description: 'This will be used to create a new company connection group leadlist the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new company connection group leadlist successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Param('conn_groupId') connection_groupId: string,
        @Body() createConnectionGroupsLeadListDto: CreateConnectionGroupsLeadListDto
    ) {
        return { companyId, connection_groupId, createConnectionGroupsLeadListDto}
    }

    
    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company connection group leadlist', description: 'This will be used to delete a company connection group leadlist but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company connection group leadlist successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('conn_groupId') connection_groupId: string,
        @Param('id') id: string,
    ){
        return { id, companyId, connection_groupId }
    }
}