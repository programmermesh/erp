import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { AuthGuard } from '../../common/guards'
import {  ValidParamId } from "../../common/valid-param-id.dto";
import { CompaniesBusinessSectorsService } from './companies-business-sectors.service'
import { CreateCompanyBusinessSectorDto } from './dto/create-company-business-sector.dto'

@ApiTags('Company Business Sectors')
@Controller('/companies/:companyId/business_sectors')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesBusinessSectorsController {

    constructor(private readonly companiesBusinessSectorsService: CompaniesBusinessSectorsService ){}

    @Get()
    @ApiOperation({ summary: 'Get all company business sectors', description: 'This will be used to get a list of company business sectors '  })
    @ApiResponse({ status: 200, description: 'List of company business sectors fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesBusinessSectorsService.getAll(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Create a company business sector', description: 'This will be used to create a new company business sector the will be used in the system ' })
    @ApiResponse({ status: 200, description: 'Creating new company business sector successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createCompanyBusinessSectorDto: CreateCompanyBusinessSectorDto
    ){
        return this.companiesBusinessSectorsService.create(params,req.user,createCompanyBusinessSectorDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company business sector', description: 'This will be used to delete a company business sector ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company business sector successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param() params: ValidParamId,
        @Request() req,        
    ){
        return this.companiesBusinessSectorsService.delete(params, req.user)
    }
}