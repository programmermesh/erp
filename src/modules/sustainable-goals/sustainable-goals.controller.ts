import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { CreateSustainableGoalDto } from './dto/create-sustainable-goal.dto'
import { UpdateSustainableGoalDto } from './dto/update-sustainable-goal.dto'
import { SustainableGoalsService } from './sustainable-goals.service'
import { ValidParamId } from '../../common/valid-param-id.dto'

@ApiTags('Sustainable Goals (System Data)')
@Controller('sustainable_goals')
export class SustainableGoalsController {
    constructor(private readonly sustainableGoalsService: SustainableGoalsService){}

    @Get()
    @ApiOperation({ summary: 'Get all sustainable goals', description: 'This will be used to get a list of sustainable goals and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of sustainable goals fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get() {
        return this.sustainableGoalsService.getAll()
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a sustainable goals' , description: 'This will be used to get the a sustainable goals using the ID' })
    @ApiResponse({ status: 200, description: 'sustainable goals fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId
    ){
        return this.sustainableGoalsService.getById(params.id)
    }

    @Post()
    @ApiOperation({summary: 'Create a sustainable goal', description: 'This will be used to create a new sustainable goal the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new sustainable goal successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Body() createSustainableGoalDto: CreateSustainableGoalDto
    ){
        return this.sustainableGoalsService.create(createSustainableGoalDto)
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a sustainable goal', description: 'This will be used to update a sustainable goal details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the sustainable goal successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Body() updateSustainableGoalDto: UpdateSustainableGoalDto
    ) {
        return this.sustainableGoalsService.update(params.id, updateSustainableGoalDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a sustainable goal', description: 'This will be used to delete a sustainable goal but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the sustainable goal successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId
    ) {
        return this.sustainableGoalsService.delete(params.id)
    }
}
