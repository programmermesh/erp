import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCompanyValueDto } from './dto/create-company-value.dto'
import { UpdateCompanyValueDto } from './dto/update-company-value.dto'

@ApiTags('Companies Values')
@Controller('/companies/:companyId/values')
export class CompaniesValuesController {
    @Get()
    @ApiOperation({ summary: 'Get all company values', description: 'This will be used to get a list of company values'  })
    @ApiResponse({ status: 200, description: 'List of company values fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') companyId: string
    ) {
        return { companyId }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company value' , description: 'This will be used to get the a company value using the ID' })
    @ApiResponse({ status: 200, description: 'company values fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('companyId') companyId: string,
        @Param('id') id: string
    ) {
        return { id, companyId }
    }

    @Post()
    @ApiOperation({summary: 'Register a company values', description: 'This will be used to create a new company values' })
    @ApiResponse({ status: 200, description: 'Creating new company values successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') companyId: string,
        @Body() createCompanyValueDto: CreateCompanyValueDto
    ) {
        return { companyId, createCompanyValueDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company values', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company values details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Body() updateCompanyValueDto: UpdateCompanyValueDto
    ) {
        return { id, companyId, updateCompanyValueDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company value', description: 'This will be used to delete a company value' })
    @ApiResponse({ status: 200, description: 'Deleting of the company value successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') companyId: string,
        @Param('id') id: string
    ) {
        return { id, companyId }
    }
}
