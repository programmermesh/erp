import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompaniesPerformanceIndicatorRevenueService } from './companies-performance-indicator-revenue.service'
import { CreateDto } from './dto/create.dto'

@ApiTags('Companies Performance Indicator Revenue')
@Controller('/companies/:companyId/performance_indicator_revenues')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesPerformanceIndicatorRevenueController {
    
    constructor(
        private readonly companiesPerformanceIndicatorRevenueService: CompaniesPerformanceIndicatorRevenueService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all', description: 'This will be used to get a list data'  })
    get(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesPerformanceIndicatorRevenueService.getAll(params,req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get By Id' , description: 'This will be used to get by ID' })
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesPerformanceIndicatorRevenueService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Post request', description: 'This will be used to create a new entry' })
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createDto: CreateDto
    ) {
        return this.companiesPerformanceIndicatorRevenueService.create(
            params,
            req.user,
            createDto
        )
    }

    // @Patch('/:id')
    // @ApiOperation({ summary: 'Patch request', description: 'This will be used to update an entrity by using the ID' })
    // update(
    //     @Param() params: ValidParamId,
    //     @Request() req,
    //     @Body() updateDto: UpdateCustomersDto
    // ){
    //     return this.companiesPerformanceIndicatorCustomersService.update(
    //         params,
    //         req.user,
    //         updateDto
    //     )
    // }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete Request', description: 'This will be used to delete an entity ' })
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesPerformanceIndicatorRevenueService.delete(params,req.user)
    }
}


