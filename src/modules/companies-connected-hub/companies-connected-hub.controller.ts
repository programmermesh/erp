import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation,  ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompaniesConnectedHubService } from './companies-connected-hub.service'
import { CreateConnectedHubDto } from './dto/create.dto'
import { UpdateConnectedHubDto } from './dto/update.dto'

@ApiTags('Companies Connected Hub')
@Controller('/companies/:companyId/connected_hubs')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesConnectedHubController {
    
    constructor(
        private readonly companiesConnectedHubService: CompaniesConnectedHubService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company connected hubs', description: 'This will be used to get a list of company connected hubs'  })
    get(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesConnectedHubService.getAll(params,req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company connected hub' , description: 'This will be used to get the a company connected hub using the ID' })
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesConnectedHubService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company connected hub', description: 'This will be used to create a new company connected hub' })
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createConnectedHubDto: CreateConnectedHubDto
    ) {
        return this.companiesConnectedHubService.create(
            params,
            req.user,
            createConnectedHubDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company connected hub', description: 'This will be used to update a company connected hub details using the ID' })
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateConnectedHubDto: UpdateConnectedHubDto
    ){
        return this.companiesConnectedHubService.update(
            params,
            req.user,
            updateConnectedHubDto
        )
    }


    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company connnected hub', description: 'This will be used to delete a company connnected hub ' })
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesConnectedHubService.delete(params,req.user)
    }
}


