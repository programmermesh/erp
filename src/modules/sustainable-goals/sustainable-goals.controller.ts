import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateSustainableGoalDto } from './dto/create-sustainable-goal.dto'
import { UpdateSustainableGoalDto } from './dto/update-sustainable-goal.dto'
import { SustainableGoalInterface } from './interfaces/sustainable-goal.interface'

@ApiTags('Sustainable Goals (System Data)')
@Controller('sustainable_goals')
export class SustainableGoalsController {
    @Get()
    @ApiOperation({ summary: 'Get all sustainable goals', description: 'This will be used to get a list of sustainable goals and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of sustainable goals fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all sustainable goals response data object'
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a sustainable goals' , description: 'This will be used to get the a sustainable goals using the ID' })
    @ApiResponse({ status: 200, description: 'sustainable goals fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('id') id: string
    ){
        return { id }
    }

    @Post()
    @ApiOperation({summary: 'Create a sustainable goal', description: 'This will be used to create a new sustainable goal the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new sustainable goal successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Body() createSustainableGoalDto: CreateSustainableGoalDto
    ){
        return { createSustainableGoalDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a sustainable goal', description: 'This will be used to update a sustainable goal details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the sustainable goal successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: string,
        @Body() updateSustainableGoalDto: UpdateSustainableGoalDto
    ) {
        return { id, updateSustainableGoalDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a sustainable goal', description: 'This will be used to delete a sustainable goal but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the sustainable goal successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('id') id: string
    ) {
        return { id }
    }
}
