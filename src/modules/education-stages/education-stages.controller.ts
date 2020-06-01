import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateEducationStagesDto } from './dto/create-education-stage.dto'
import { UpdateEducationStagesDto } from './dto/update-education-stage.dto'

@ApiTags('Education stages (System Data)')
@Controller('education_stages')
export class EducationStagesController {
    @Get()
    @ApiOperation({ summary: 'Get all education stages', description: 'This will be used to get a list of education stages and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of education stages fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all education stages response data object'
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a education stages' , description: 'This will be used to get the a education stages using the ID' })
    @ApiResponse({ status: 200, description: 'education stages fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(@Param('id') id: ValidParamId): string {
        return 'This will replaced with a GET education stages response data object'
    }

    @Post()
    @ApiOperation({summary: 'Create a education stage', description: 'This will be used to create a new education stage the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new education stage successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Body() createEducationStagesDto: CreateEducationStagesDto
    ) {
        return createEducationStagesDto
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a education stage', description: 'This will be used to update a education stage details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the education stage successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: ValidParamId,
        @Body() updateEducationStagesDto: UpdateEducationStagesDto
    ){
        return {id, updateEducationStagesDto}
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a education stage', description: 'This will be used to delete a education stage but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the education stage successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(@Param('id') id: ValidParamId): string {
        return 'This will replaced with a DELETE education stage response data object'
    }
}
