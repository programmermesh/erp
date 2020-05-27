import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import {  ValidParamId } from "../../common/valid-param-id.dto";
import { CreateCompanyBusinessSectorDto } from './dto/create-company-business-sector.dto'

@ApiTags('Company Business Sectors')
@Controller('/companies/:companyId/business_sectors')
export class CompaniesBusinessSectorsController {
    @Get()
    @ApiOperation({ summary: 'Get all company business sectors', description: 'This will be used to get a list of company business sectors and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of company business sectors fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company business sectors response data object'
    }

    @Post()
    @ApiOperation({summary: 'Create a company business sector', description: 'This will be used to create a new company business sector the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new company business sector successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') company_id: string,
        @Body() createCompanyBusinessSectorDto: CreateCompanyBusinessSectorDto
    ){
        return { company_id, createCompanyBusinessSectorDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company business sector', description: 'This will be used to delete a company business sector but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company business sector successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('id') id: string,
        @Param('companyId') company_id: string
        
    ){
        return { id, company_id }
    }
}