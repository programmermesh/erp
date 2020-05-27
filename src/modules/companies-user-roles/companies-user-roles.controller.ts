import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCompanyUserRoleDto } from './dto/create-company-user-role.dto'
import { UpdateCompanyUserRoleDto } from './dto/update-company-user-role.dto'

@ApiTags('Company User Roles')
@Controller('/companies/:companyId/user_roles')
export class CompaniesUserRolesController {
    @Get()
    @ApiOperation({ summary: 'Get all company user roles', description: 'This will be used to get a list of company user roles'  })
    @ApiResponse({ status: 200, description: 'List of company user roles fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company user roles response data object'
    }

    // @Get('/companies/:companyId/user_roles/:id')
    // @ApiOperation({ summary: 'Get a company user roles' , description: 'This will be used to get the a company user roles using the ID' })
    // @ApiResponse({ status: 200, description: 'company user roles fetching successful.'})
    // @ApiResponse({ status: 403, description: 'Forbidden.'})
    // getById(): string {
    //     return 'This will replaced with a GET company user roles response data object'
    // }

    @Post()
    @ApiOperation({summary: 'Create a company user role', description: 'This will be used to create a new company user role the will be used in the company' })
    @ApiResponse({ status: 200, description: 'Creating new company user role successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('companyId') company_id: string,
        @Body() createCompanyUserRoleDto: CreateCompanyUserRoleDto
    ) {
        return { company_id, createCompanyUserRoleDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company user role', description: 'This will be used to update a company user role details using the ID ' })
    @ApiResponse({ status: 200, description: 'Updating the company user role successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('companyId') company_id: string,
        @Param('id') id: string,
        @Body() updateCompanyUserRoleDto: UpdateCompanyUserRoleDto
    ){
        return { id, company_id, updateCompanyUserRoleDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company user role', description: 'This will be used to delete a company user role' })
    @ApiResponse({ status: 200, description: 'Deleting of the company user role successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('companyId') company_id: string,
        @Param('id') id: string
    ) {
        return { id, company_id }
    }
}