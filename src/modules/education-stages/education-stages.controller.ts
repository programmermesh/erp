import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { EducationStagesService } from './education-stages.service'
import { CreateEducationStagesDto } from './dto/create-education-stage.dto'
import { UpdateEducationStagesDto } from './dto/update-education-stage.dto'

@ApiTags('Education stages (System Data)')
@Controller('education_stages')

export class EducationStagesController {
    constructor(
        private readonly educationStagesService: EducationStagesService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all education stages', description: 'This will be used to get a list of education stages and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of education stages fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(){
        return this.educationStagesService.getAll()
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a education stages' , description: 'This will be used to get the a education stages using the ID' })
    @ApiResponse({ status: 200, description: 'education stages fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId
    ) {
        return this.educationStagesService.getById(params)
    }

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Create a education stage', description: 'This will be used to create a new education stage the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new education stage successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Body() createEducationStagesDto: CreateEducationStagesDto
    ) {
        return this.educationStagesService.create(createEducationStagesDto)
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a education stage', description: 'This will be used to update a education stage details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the education stage successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Body() updateEducationStagesDto: UpdateEducationStagesDto
    ){
        return this.educationStagesService.update(params,updateEducationStagesDto)
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a education stage', description: 'This will be used to delete a education stage but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the education stage successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(@Param() params: ValidParamId) {
        return this.educationStagesService.delete(params)
    }
}
