import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Channels (System Data)')
@Controller('channels')
export class ChannelsController {
    @Get()
    @ApiOperation({ summary: 'Get all channels', description: 'This will be used to get a list of channels and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of channels fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all channels response data object'
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a channels' , description: 'This will be used to get the a channels using the ID' })
    @ApiResponse({ status: 200, description: 'channels fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET channels response data object'
    }

    @Post()
    @ApiOperation({summary: 'Create a channel', description: 'This will be used to create a new channel the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new channel successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a channel', description: 'This will be used to update a channel details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the channel successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE channel response data object'
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a channel', description: 'This will be used to delete a channel but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the channel successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE channel response data object'
    }
}
