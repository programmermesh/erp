import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompaniesMarketPotentialsService } from './companies-market-potentials.service'
import { CreateMarketPotentialDto } from './dto/create-market-potential.dto'
import { UpdateMarketPotentialDto } from './dto/update-market-potential.dto'

@ApiTags('Companies Market Potentials')
@Controller('/companies/:companyId/market_potentials')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesMarketPotentialsController {
     
    constructor(
        private readonly companiesMarketPotentialsService: CompaniesMarketPotentialsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company market potentials', description: 'This will be used to get a list of company market potentials'  })
    @ApiResponse({ status: 200, description: 'List of company market potentials fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesMarketPotentialsService.getAll(params,req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company market potential' , description: 'This will be used to get the a company market potential using the ID' })
    @ApiResponse({ status: 200, description: 'company market potentials fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesMarketPotentialsService.getById(params,req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company market potential', description: 'This will be used to create a new company market potential' })
    @ApiResponse({ status: 200, description: 'Creating new company market potential successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createMarketPotentialDto: CreateMarketPotentialDto
    ) {
        return this.companiesMarketPotentialsService.create(
            params,
            req.user,
            createMarketPotentialDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company market potentials', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company market potentials details successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateMarketPotentialDto: UpdateMarketPotentialDto
    ) {
        return this.companiesMarketPotentialsService.update(
            params,
            req.user,
            updateMarketPotentialDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company market potential', description: 'This will be used to delete a company market potential' })
    @ApiResponse({ status: 200, description: 'Deleting of the company market potential successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesMarketPotentialsService.delete(params, req.user)
    }
}
