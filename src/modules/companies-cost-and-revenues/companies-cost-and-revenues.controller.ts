import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompaniesCostAndRevenuesService } from './companies-cost-and-revenues.service'
import { CreateCompanyCostAndRevenuesDto } from './dto/create-company-cost-and-revenue.dto'
import { UpdateCompanyCostAndRevenuesDto } from './dto/update-company-cost-and-revenue.dto'

@ApiTags('Companies Cost and Revenues')
@Controller('/companies/:companyId/costs_and_revenues')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesCostAndRevenuesController {
    
    constructor(
        private readonly companiesCostAndRevenuesService: CompaniesCostAndRevenuesService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company cost and revenues', description: 'This will be used to get a list of company cost and revenues'  })
    @ApiResponse({ status: 200, description: 'List of company cost and revenues fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesCostAndRevenuesService.getAll(params,req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company cost and revenue' , description: 'This will be used to get the a company cost and revenue using the ID' })
    @ApiResponse({ status: 200, description: 'company cost and revenues fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesCostAndRevenuesService.getById(params,req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company cost and revenues', description: 'This will be used to create a new company cost and revenues' })
    @ApiResponse({ status: 200, description: 'Creating new company cost and revenues successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createCompanyCostAndRevenuesDto: CreateCompanyCostAndRevenuesDto
    ) {
        return this.companiesCostAndRevenuesService.create(
            params,
            req.user,
            createCompanyCostAndRevenuesDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company cost and revenues', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company cost and revenues details successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateCompanyCostAndRevenuesDto: UpdateCompanyCostAndRevenuesDto
    ) {
        return this.companiesCostAndRevenuesService.update(
            params,
            req.user,
            updateCompanyCostAndRevenuesDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company cost and revenue', description: 'This will be used to delete a company cost and revenue' })
    @ApiResponse({ status: 200, description: 'Deleting of the company cost and revenue successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesCostAndRevenuesService.delete(params, req.user)
    }
}
