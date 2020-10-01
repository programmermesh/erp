import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompaniesConnectionsService } from './companies-networks.service'
import { CreateCompanyConnectionkDto } from './dto/create-company-network.dto'
import { UpdateCompanyConnectionkDto } from './dto/update-company-network.dto'
import { SearchDto } from './dto/searchDto';

@ApiTags('Company Connections')
@Controller('/companies/:companyId/networks')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesConnectionsController {
    
    constructor(
        private readonly companiesConnectionsService: CompaniesConnectionsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company networks', description: 'This will be used to get a list of company networks'  })
    get(
        @Param() params: ValidParamId,
        @Request() req,
        @Query() searchDto: SearchDto
    ) {        
        return this.companiesConnectionsService.getAll(params,searchDto, req.user)
    }

    @Get('/analytic/data')
    @ApiOperation({ summary: 'Get all company networks analytic data', description: 'This will be used to get a list of company networks analytic data'  })
    getAnalyticData(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesConnectionsService.getAnalyticData(params, req.user)
    }

    @Get('/reasons/all')
    @ApiOperation({ summary: 'Get all reasons in network connection', description: 'This will be used to get a list of reasons company networks'  })
    @ApiResponse({ status: 200, description: 'List of company networks fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getAllReasons(
        @Param() params: ValidParamId,
        @Request() req,
    ) {
        return this.companiesConnectionsService.getAllReasons(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company network' , description: 'This will be used to get the a company network using the ID' })
    @ApiResponse({ status: 200, description: 'company network fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId, 
        @Request() req
    ){
        return this.companiesConnectionsService.getById(params,req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company network', description: 'This will be used to create a new company network' })
    @ApiResponse({ status: 200, description: 'Creating new company network successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
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

