import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Company User Roles')
@Controller()
export class CompaniesUserRolesController {
    @Get('/companies/:companyId/user_roles')
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

    @Post('/companies/:companyId/user_roles')
    @ApiOperation({summary: 'Create a company user role', description: 'This will be used to create a new company user role the will be used in the company' })
    @ApiResponse({ status: 200, description: 'Creating new company user role successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/companies/:companyId/user_roles/:id')
    @ApiOperation({ summary: 'Update a company user role', description: 'This will be used to update a company user role details using the ID ' })
    @ApiResponse({ status: 200, description: 'Updating the company user role successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company user role response data object'
    }

    @Delete('/companies/:companyId/user_roles/:id')
    @ApiOperation({ summary: 'Delete a company user role', description: 'This will be used to delete a company user role' })
    @ApiResponse({ status: 200, description: 'Deleting of the company user role successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company user role response data object'
    }
}