import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateLeadListDto } from './dto/create-company-lead-list.dto'
import { UpdateLeadListDto } from './dto/update-company-lead-list.dto'

@ApiTags('Companies Lead List')
@Controller('/companies/:companyId/lead_list')
export class CompaniesLeadListController {
    @Get()
    @ApiOperation({ summary: 'Get all company lead list', description: 'This will be used to get a list of company lead list'  })
    @ApiResponse({ status: 200, description: 'List of company lead list fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') company_id: string
    ) {
        return { company_id, data: [] }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company lead list profile' , description: 'This will be used to get the a company lead list using the ID' })
    @ApiResponse({ status: 200, description: 'company lead list profile fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('companyId') company_id: string,
        @Param('id') id: string
    ) {
        return { id, company_id }
    }

    @Post()
    @ApiOperation({summary: 'Register a company lead list', description: 'This will be used to create a new company lead list' })
    @ApiResponse({ status: 200, description: 'Creating new company lead list successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') company_id: string,
        @Body() createLeadListDto: CreateLeadListDto
    ){
        return { company_id, createLeadListDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company lead list', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company lead list details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') company_id: string,
        @Param('id') id: string,
        @Body() updateLeadListDto: UpdateLeadListDto
    ) {
        return { id, company_id, updateLeadListDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company lead list', description: 'This will be used to delete a company lead list ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company lead list successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') company_id: string,
        @Param('id') id: string
    ){
        return { id, company_id }
    }
}
