import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompaniesMilestonesService } from './companies-milestones.service'
import { CreateCompanyMilestoneDto } from './dto/create-company-milestone.dto'
import { UpdateCompanyMilestoneDto } from './dto/update-company-milestone.dto'

@ApiTags('Company Milestones')
@Controller('/companies/:companyId/milestones')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesMilestonesController {

    constructor(
        private readonly companiesMilestonesService: CompaniesMilestonesService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company milestones', description: 'This will be used to get a list of company milestones'  })
    @ApiResponse({ status: 200, description: 'List of company milestones fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesMilestonesService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company milestone profile' , description: 'This will be used to get the a company milestone using the ID' })
    @ApiResponse({ status: 200, description: 'company milestone profile fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesMilestonesService.getById(params,req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company milestone', description: 'This will be used to create a new company milestone / register' })
    @ApiResponse({ status: 200, description: 'Creating new company milestone successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createCompanyMilestoneDto: CreateCompanyMilestoneDto
    ){
        return this.companiesMilestonesService.create(
            params,
            req.user,
            createCompanyMilestoneDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company milestone', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company milestone details successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateCompanyMilestoneDto: UpdateCompanyMilestoneDto
    ){
        return this.companiesMilestonesService.update(
            params,
            req.user,
            updateCompanyMilestoneDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company milestone', description: 'This will be used to delete a company milestone ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company milestone successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesMilestonesService.delete(params,req.user)
    }
}


