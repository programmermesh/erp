import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompaniesPerformanceIndicatorCustomersService } from './companies-performance-indicator-customers.service'
import { CreateCustomersDto } from './dto/create.dto'
import { UpdateCustomersDto } from './dto/update.dto'
import { SearchDto } from './dto/searchDto';

@ApiTags('Companies Performance Indicator Customers')
@Controller('/companies/:companyId/performance_indicator_customers')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesPerformanceIndicatorCustomersController {
    
    constructor(
        private readonly companiesPerformanceIndicatorCustomersService: CompaniesPerformanceIndicatorCustomersService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all', description: 'This will be used to get a list data'  })
    get(
        @Param() params: ValidParamId,
        @Request() req,
        @Query() searchDto: SearchDto
    ) {
        return this.companiesPerformanceIndicatorCustomersService.getAll(params,req.user, searchDto)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get By Id' , description: 'This will be used to get by ID' })
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesPerformanceIndicatorCustomersService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Post request', description: 'This will be used to create a new entry' })
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createDto: CreateCustomersDto
    ) {
        return this.companiesPerformanceIndicatorCustomersService.create(
            params,
            req.user,
            createDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Patch request', description: 'This will be used to update an entrity by using the ID' })
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateDto: UpdateCustomersDto
    ){
        return this.companiesPerformanceIndicatorCustomersService.update(
            params,
            req.user,
            updateDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete Request', description: 'This will be used to delete an entity ' })
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesPerformanceIndicatorCustomersService.delete(params,req.user)
    }
}

