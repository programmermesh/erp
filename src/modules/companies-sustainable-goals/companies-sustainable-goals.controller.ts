import { Controller, Get, Post, Delete, Param, Body, Patch, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { AuthGuard } from '../../common/guards'
import {  ValidParamId } from "../../common/valid-param-id.dto";
import { CompaniesSustainableGoalsService } from './companies-sustainable-goals.service'
import { CreateCompanySustainableGoalDto } from './dto/create-company-sustainable-goal.dto'
import { UpdateCompanySustainableGoalDto } from './dto/update-company-sustainable-goal.dto'

@ApiTags('Company sustainable goals')
@Controller('/companies/:companyId/sustainable_goals')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesSustainableGoalsController {

    constructor( private readonly companiesSustainableGoalsService: CompaniesSustainableGoalsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all company sustainable goals', description: 'This will be used to get a list of company sustainable goals and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of company sustainable goals fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesSustainableGoalsService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company sustainable goals' , description: 'This will be used to get the a company sustainable goals using the ID' })
    @ApiResponse({ status: 200, description: 'Company sustainable goals fetching successful.'})
      @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesSustainableGoalsService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Create a company sustainable goal', description: 'This will be used to create a new company sustainable goal the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new company sustainable goal successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createCompanySustainableGoalDto: CreateCompanySustainableGoalDto
    ){
        return this.companiesSustainableGoalsService.create(
            params,
            req.user,
            createCompanySustainableGoalDto
        )
    }

    @Patch('/:id')
    @ApiOperation({summary: 'Update a company sustainable goal', description: 'This will be used to create a new company sustainable goal the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Updating company sustainable goal successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateCompanySustainableGoalDto: UpdateCompanySustainableGoalDto
    ){
        return this.companiesSustainableGoalsService.update(
            params,
            req.user,
            updateCompanySustainableGoalDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company sustainable goal', description: 'This will be used to delete a company sustainable goal but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company sustainable goal successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Request() req,
    ) {
        return this.companiesSustainableGoalsService.delete(params, req.user)
    }
}

