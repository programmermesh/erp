import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

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
    getById(): string {
        return 'This will replaced with a GET sustainable goals response data object'
    }

    @Post()
    @ApiOperation({summary: 'Create a sustainable goal', description: 'This will be used to create a new sustainable goal the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new sustainable goal successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a sustainable goal', description: 'This will be used to update a sustainable goal details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the sustainable goal successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE sustainable goal response data object'
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a sustainable goal', description: 'This will be used to delete a sustainable goal but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the sustainable goal successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE sustainable goal response data object'
    }
}
