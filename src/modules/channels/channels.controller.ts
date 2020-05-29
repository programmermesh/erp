import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateChannelDto } from './dto/create-channel.dto'
import { UpdateChannelDto } from './dto/update-channel.dto'

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
    getById(
        @Param('id') id: string
    ) {
        return { id }
    }

    @Post()
    @ApiOperation({summary: 'Create a channel', description: 'This will be used to create a new channel the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new channel successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Body() createChannelDto: CreateChannelDto
    ){
        return { createChannelDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a channel', description: 'This will be used to update a channel details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the channel successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: string,
        @Body() updateChannelDto: UpdateChannelDto
    ){
        return { id, updateChannelDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a channel', description: 'This will be used to delete a channel but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the channel successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('id') id: string
    ) {
        return { id }
    }
}
