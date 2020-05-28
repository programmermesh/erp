import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCompanyMilestone } from './dto/create-company-milestone.dto'
import { UpdateCompanyMilestone } from './dto/update-company-milestone.dto'

@ApiTags('Company Milestones')
@Controller('/companies/:companyId/milestones')
export class CompaniesMilestonesController {
    @Get()
    @ApiOperation({ summary: 'Get all company milestones', description: 'This will be used to get a list of company milestones'  })
    @ApiResponse({ status: 200, description: 'List of company milestones fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('companyId') company_id: string
    ){
        return { company_id }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company milestone profile' , description: 'This will be used to get the a company milestone using the ID' })
    @ApiResponse({ status: 200, description: 'company milestone profile fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('id') id: string,
        @Param('companyId') company_id: string
    ){
        return { id, company_id }
    }

    @Post()
    @ApiOperation({summary: 'Register a company milestone', description: 'This will be used to create a new company milestone / register' })
    @ApiResponse({ status: 200, description: 'Creating new company milestone successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('id') id: string,
        @Param('companyId') company_id: string,
        @Body() createCompanyMilestone: CreateCompanyMilestone
    ){
        return { id, company_id, createCompanyMilestone }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company milestone', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company milestone details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: string,
        @Param('companyId') company_id: string,
        @Body() updateCompanyMilestone: UpdateCompanyMilestone
    ){
        return { id, company_id, updateCompanyMilestone }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company milestone', description: 'This will be used to delete a company milestone ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company milestone successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('id') id: string,
        @Param('companyId') company_id: string
    ) {
        return { id, company_id }
    }
}


