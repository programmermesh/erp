import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompaniesConnectionGroupsLeadlistService } from './companies-connection-groups-leadlist.service'
import { CreateConnectionGroupsLeadListDto } from './dto/create-company-connection-group-leadlist.dto'
import { SearchDto } from './dto/searchDto';
import { UpdateConnectionGroupsLeadListDto } from './dto/updateDto'

@ApiTags('Companies Connection groups leadlist ')
@Controller('companies/:companyId')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesConnectionGroupsLeadlistController {

    constructor(
        private readonly companiesConnectionGroupsLeadlistService: CompaniesConnectionGroupsLeadlistService
    ){}

    @Get('/connection_groups/:connection_groupId/lead_list')
    @ApiOperation({ summary: 'Get all company connection group leadlists ', description: 'This will be used to get a list of company connection group leadlists and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of company connection group leadlists fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesConnectionGroupsLeadlistService.getAll(params,req.user)
    }
    
    //searchAllLeadListFromGroup
    @Get('/search/lead_list')
    @ApiOperation({ summary: 'Serach for lead list', description: 'We use this endpoint to search for leadlist using a keyword'  })
    @ApiResponse({ status: 200, description: 'Searching lead list successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    searchAllLeadListFromGroup(
        @Param() params: ValidParamId,
        @Request() req,
        @Query() searchDto: SearchDto
    ){
        return this.companiesConnectionGroupsLeadlistService.searchAllLeadListFromGroup(params,searchDto,req.user)
    }

    @Get('/connection_groups/:connection_groupId/lead_list/:id')
    @ApiOperation({ summary: 'Get a company connection group leadlists' , description: 'This will be used to get the a company connection group leadlists using the ID' })
    @ApiResponse({ status: 200, description: 'company connection group leadlists fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesConnectionGroupsLeadlistService.getById(params,req.user)
    }

    @Post('/connection_groups/:connection_groupId/lead_list')
    @ApiOperation({summary: 'Create a company connection group leadlist', description: 'This will be used to create a new company connection group leadlist the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new company connection group leadlist successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createConnectionGroupsLeadListDto: CreateConnectionGroupsLeadListDto
    ) {
        return this.companiesConnectionGroupsLeadlistService.create(
            params,
            req.user,
            createConnectionGroupsLeadListDto
        )
    }

    @Patch('/connection_groups/:connection_groupId/lead_list/:id')
    @ApiOperation({summary: 'Update a company connection group leadlist', description: 'This will be used to update a company connection group leadlist the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Updating leadlist successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateConnectionGroupsLeadListDto: UpdateConnectionGroupsLeadListDto
    ) {
        //return  updateConnectionGroupsLeadListDto
        return this.companiesConnectionGroupsLeadlistService.update(
            params,
            req.user,
            updateConnectionGroupsLeadListDto
        )
    }

    
    @Delete('/connection_groups/:connection_groupId/lead_list/:id')
    @ApiOperation({ summary: 'Delete a company connection group leadlist', description: 'This will be used to delete a company connection group leadlist but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company connection group leadlist successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param() params: ValidParamId,
        @Param('id') id: string,
        @Param('companyId') companyId: string,
        @Param('connection_groupId') connection_groupId: string,
        @Request() req
    ){
        return this.companiesConnectionGroupsLeadlistService.delete(params, req.user)
    }
}