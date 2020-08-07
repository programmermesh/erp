import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateCompanyUserRoleDto } from './dto/create-company-user-role.dto'
import { UpdateCompanyUserRoleDto } from './dto/update-company-user-role.dto'
import { CompaniesUserRolesService } from './companies-user-roles.service'

@ApiTags('Company User Roles')
@Controller('/companies/:companyId/user_roles')
//@UseGuards(AuthGuard)
//@ApiBearerAuth()
export class CompaniesUserRolesController {
    constructor(private readonly companiesUserRolesService: CompaniesUserRolesService){}

    @Get()
    @ApiOperation({ summary: 'Get all company user roles', description: 'This will be used to get a list of company user roles'  })
    @ApiResponse({ status: 200, description: 'List of company user roles fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        //@Request() req
    ){
        return this.companiesUserRolesService.getAll(params.companyId)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company user roles' , description: 'This will be used to get the a company user roles using the ID' })
    @ApiResponse({ status: 200, description: 'company user roles fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req
    ){
        return this.companiesUserRolesService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Create a company user role', description: 'This will be used to create a new company user role the will be used in the company' })
    @ApiResponse({ status: 200, description: 'Creating new company user role successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Request() req,
        @Body() createCompanyUserRoleDto: CreateCompanyUserRoleDto
    ) {
        return this.companiesUserRolesService.create(params.companyId, req.user ,createCompanyUserRoleDto)
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company user role', description: 'This will be used to update a company user role details using the ID ' })
    @ApiResponse({ status: 200, description: 'Updating the company user role successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req,
        @Body() updateCompanyUserRoleDto: UpdateCompanyUserRoleDto
    ){
        return this.companiesUserRolesService.update(params, req.user, updateCompanyUserRoleDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company user role', description: 'This will be used to delete a company user role' })
    @ApiResponse({ status: 200, description: 'Deleting of the company user role successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req
    ) {
        return this.companiesUserRolesService.delete(params, req.user)
    }
}