import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { CompaniesService } from './companies.service'
import { AuthGuard } from '../../common/guards'

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService){}
    @Get()
    @ApiOperation({ summary: 'Get all companies', description: 'This will be used to get a list of companies under the current user'  })
    @ApiResponse({ status: 200, description: 'List of companies fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get() {
        return this.companiesService.getCompanies()
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company profile' , description: 'This will be used to get the a company profile using the ID' })
    @ApiResponse({ status: 200, description: 'User profile fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('id') id: string
    ) {
        return this.companiesService.getCompanyById(id)
    }

    @Post()
    @ApiOperation({summary: 'Register/Create a company', description: 'This will be used to create a new company the will be user the currently logged in user' })
    @ApiResponse({ status: 200, description: 'Creating new company successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(@Body() createCompanyDto: CreateCompanyDto){
        return this.companiesService.createCompany(createCompanyDto)
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company', description: 'This will be used to update a company profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: string,
        @Body() updateCompanyDto: UpdateCompanyDto
    ){
        return this.companiesService.updateCompany(id, updateCompanyDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company', description: 'This will be used to delete a compnay but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the company successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company response data object'
    }
}
