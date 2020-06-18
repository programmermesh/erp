import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompaniesConnectionsService } from './companies-connections.service'
import { CreateCompanyConnectionkDto } from './dto/create-company-network.dto'
import { UpdateCompanyConnectionkDto } from './dto/update-company-network.dto'

@ApiTags('Company Connections')
@Controller('/companies/:companyId/connections')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesConnectionsController {
    
    constructor(
        private readonly companiesConnectionsService: CompaniesConnectionsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company connections', description: 'This will be used to get a list of company connections'  })
    @ApiResponse({ status: 200, description: 'List of company connections fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Param('id') id: string,
        @Param('companyId') companyId: string,
        @Request() req
    ) {
        return this.companiesConnectionsService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company connection profile' , description: 'This will be used to get the a company connection profile using the ID' })
    @ApiResponse({ status: 200, description: 'company connection profile fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,        
        @Param('id') id: string,
        @Param('companyId') companyId: string,
        @Request() req
    ){
        return this.companiesConnectionsService.getById(params,req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company connection', description: 'This will be used to create a new company connection / register' })
    @ApiResponse({ status: 200, description: 'Creating new company connection successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Request() req,
        @Body() createCompanyConnectionkDto: CreateCompanyConnectionkDto
    ) {
        return this.companiesConnectionsService.create(
            params,
            req.user,
            createCompanyConnectionkDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company connection', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company connection details successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Param('id') id: string,
        @Param('companyId') companyId: string,
        @Request() req,
        @Body() updateCompanyConnectionkDto: UpdateCompanyConnectionkDto
    ) {
        return this.companiesConnectionsService.update(
            params,
            req.user,
            updateCompanyConnectionkDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company connection', description: 'This will be used to delete a company connection ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company connection successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Param('id') id: string,
        @Param('companyId') companyId: string,
        @Request() req
    ) {
        return this.companiesConnectionsService.delete(params, req.user)
    }
}

