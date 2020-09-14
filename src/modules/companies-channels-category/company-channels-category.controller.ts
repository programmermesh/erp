import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CreateCompanyChannelCategoryDto } from './dto/create.dto'
import { UpdateCompanyChannelCategoryDto } from './dto/update.dto'
import { CompanyChannelsCategoryService } from './company-channels-category.service'

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('Company channels categories')
@Controller('/companies/:companyId/channels/:channelId/categories')
export class CompanyChannelsCategoryController {

    constructor(
        private readonly companyChannelsCategoryService: CompanyChannelsCategoryService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company Channels categories', description: 'This will be used to get a list of company channels cateogries'  })
    get(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companyChannelsCategoryService.getAll(params, req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company channel categories' , description: 'This will be used to get the a company channel categories using the ID' })
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companyChannelsCategoryService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company channel categories', description: 'This will be used to create a new company channel category' })
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createCompanyChannelCategoryDto: CreateCompanyChannelCategoryDto
    ) {
        return this.companyChannelsCategoryService.create(
            params,
            req.user,
            createCompanyChannelCategoryDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company channels category', description: 'This will be used to update a company channel category using the ID' })
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateCompanyChannelCategoryDto: UpdateCompanyChannelCategoryDto
    ) {
        return this.companyChannelsCategoryService.update(
            params,
            req.user,
            updateCompanyChannelCategoryDto
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company channel category', description: 'This will be used to delete a company channel category' })
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companyChannelsCategoryService.delete(params, req.user)
    }
}

