import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('channel details Details (System Data)')
@Controller('channels')
export class DetailsController {
    @Get('/:channel_id/details')
    @ApiOperation({ summary: 'Get all channel details', description: 'This will be used to get a list of channel details and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of channel details fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all channel details response data object'
    }

    @Get('/:channel_id/details/:id')
    @ApiOperation({ summary: 'Get a channel details' , description: 'This will be used to get the a channel details using the ID' })
    @ApiResponse({ status: 200, description: 'channel details fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET channel details response data object'
    }

    @Post('/:channel_id/details')
    @ApiOperation({summary: 'Create a channel', description: 'This will be used to create a new channel the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new channel successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/:channel_id/details/:id')
    @ApiOperation({ summary: 'Update a channel', description: 'This will be used to update a channel details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the channel successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE channel response data object'
    }

    @Delete('/:channel_id/details/:id')
    @ApiOperation({ summary: 'Delete a channel', description: 'This will be used to delete a channel but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the channel successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE channel response data object'
    }
}
