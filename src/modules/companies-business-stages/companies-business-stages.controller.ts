import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { AuthGuard } from '../../common/guards'
import {  ValidParamId } from "../../common/valid-param-id.dto";
import { CompaniesBusinessStagesService } from './companies-business-stages.service'
import { CreateCompanyBusinessStageDto } from './dto/create-company-business-stage.dto'
import { BulkCompanyBusinessStagesDto } from './dto/bulk-create-business-stage.dto'

@ApiTags('Company Business Stages')
@Controller('/companies/:companyId/business_stages')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesBusinessStagesController {

    constructor(
        private readonly companiesBusinessStagesService:CompaniesBusinessStagesService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company business stages', description: 'This will be used to get a list of company business stages'  })
    @ApiResponse({ status: 200, description: 'List of company business stages fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Request() req
    ){
        return this.companiesBusinessStagesService.getAll(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Create a company business stage', description: 'This will be used to create a new company business stage the will be used in the system ' })
    @ApiResponse({ status: 200, description: 'Creating new company business stage successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Request() req,
        @Body() createCompanyBusinessStageDto: CreateCompanyBusinessStageDto
    ) {
        return this.companiesBusinessStagesService.create(params,req.user,createCompanyBusinessStageDto)
    }

    // SAVE IN BULK
    @Post('/bulk/data')
    @ApiOperation({summary: 'Create multiple company business stages', description: 'This will be used to create multiple new company business stages using an array ' })
    createBulk(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() bulkCompanyBusinessStagesDto: BulkCompanyBusinessStagesDto
    ) {
        return this.companiesBusinessStagesService.createBulk(params,req.user,bulkCompanyBusinessStagesDto)
    }


    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company business stage', description: 'This will be used to delete a company business stage ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company business stage successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req
    ){
        return this.companiesBusinessStagesService.delete(params,req.user)
    }
}

