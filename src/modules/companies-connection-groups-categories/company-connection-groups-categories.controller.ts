
import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request,} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompanyConnectionGroupsCategoriesService } from './company-connection-groups-categories.service'
import { CreateConnectionGroupsCategoryDto } from './dto/created.dto'

@ApiTags('Companies Connection groups Categories')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('companies/:companyId/connection_groups/:connectionGroupId/categories')
export class CompanyConnectionGroupsCategoriesController {
    constructor(
        private readonly companyConnectionGroupsCategoriesService: CompanyConnectionGroupsCategoriesService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company connection groups categories ', description: 'This will be used to get a list of company connection groups'  })
    @ApiResponse({ status: 200, description: 'List of company connection groups categories fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Request() req
    ){
        return this.companyConnectionGroupsCategoriesService.getAll(params,req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company connection groups' , description: 'This will be used to get the a company connection groups using the ID' })
    @ApiResponse({ status: 200, description: 'company connection groups fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('id') id: string,
        @Request() req
    ) {
        return this.companyConnectionGroupsCategoriesService.getById(params,req.user)
    }

    @Post()
    @ApiOperation({summary: 'Create a company connection group', description: 'This will be used to create a new company connection group the will be used in the system ' })
    @ApiResponse({ status: 200, description: 'Creating new company connection group successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createConnectionGroupsCategoryDto: CreateConnectionGroupsCategoryDto
    ) {
        return this.companyConnectionGroupsCategoriesService.create(
            params,
            req.user,
            createConnectionGroupsCategoryDto
        )
    }

    // @Patch('/:id')
    // @ApiOperation({ summary: 'Update a company connection group', description: 'This will be used to update a company connection group using the ID' })
    // @ApiResponse({ status: 200, description: 'Updating the company connection group successful.'})
    // @ApiResponse({ status: 401, description: 'Unauthorized'})
    // update(
    //     @Param() params: ValidParamId,
    //     @Param('companyId') companyId: string,
    //     @Param('id') id: string,
    //     @Request() req,
    //     @Body() updateConnectionGroupsDto: UpdateConnectionGroupsDto
    // ) {
    //     return this.companyConnectionGroupsCategoriesService.update(
    //         params,
    //         req.user,
    //         updateConnectionGroupsDto
    //     )
    // }


    // @Delete('/:id')
    // @ApiOperation({ summary: 'Delete a company connection group', description: 'This will be used to delete a company connection group ' })
    // @ApiResponse({ status: 200, description: 'Deleting of the company connection group successful.'})
    // @ApiResponse({ status: 401, description: 'Unauthorized'})
    // delete(
    //     @Param() params: ValidParamId,
    //     @Param('companyId') companyId: string,
    //     @Param('id') id: string,
    //     @Request() req
    // ) {
    //     return this.companyConnectionGroupsCategoriesService.delete(params, req.user)
    // }
}
