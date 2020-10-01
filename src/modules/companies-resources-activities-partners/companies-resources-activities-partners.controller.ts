import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompaniesResourcesActivitiesPartnersService } from './companies-resources-activities-partners.service'
import { CreateDto} from './dto/create.dto'
import { UpdateDto } from './dto/update.dto'

@ApiTags('Companies Resources - Activities - Partners')
@Controller('/companies/:companyId/resources_activities_partners')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesResourcesActivitiesPartnersController {
    
    constructor(
        private readonly companiesResourcesActivitiesPartnersService: CompaniesResourcesActivitiesPartnersService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all Companies Resources - Activities - Partners', description: 'This will be used to get a list of Companies Resources - Activities - Partners'  })
    get(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesResourcesActivitiesPartnersService.getAll(params,req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company cost and revenue' , description: 'This will be used to get the a company cost and revenue using the ID' })
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesResourcesActivitiesPartnersService.getById(params,req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a Companies Resources - Activities - Partners', description: 'This will be used to create a new Companies Resources - Activities - Partners' })
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createDto: CreateDto
    ) {
        return this.companiesResourcesActivitiesPartnersService.create(
            params,
            req.user,
            createDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a Companies Resources - Activities - Partners', description: 'This will be used to update a profile details using the ID' })
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateDto: UpdateDto
    ) {
        return this.companiesResourcesActivitiesPartnersService.update(
            params,
            req.user,
            updateDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company cost and revenue', description: 'This will be used to delete a company cost and revenue' })
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesResourcesActivitiesPartnersService.delete(params, req.user)
    }
}

