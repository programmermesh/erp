import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateChannelDetailDto } from './dto/create-channel-details.dto'
import { UpdateChannelDetailDto } from './dto/update-channel-details.dto'

@ApiTags('Channels Details (System Data)')
@Controller('channels/:channelId/details')
export class DetailsController {
    @Get()
    @ApiOperation({ summary: 'Get all channel details', description: 'This will be used to get a list of channel details and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of channel details fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(
        @Param('channelId') channelId: string
    ) {
        return { channelId, data: [] }
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a channel details' , description: 'This will be used to get the a channel details using the ID' })
    @ApiResponse({ status: 200, description: 'channel details fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(
        @Param('channelId') channelId: string,
        @Param('id') id: string
    ) {
        return { id, channelId }
    }

    @Post()
    @ApiOperation({summary: 'Create a channel', description: 'This will be used to create a new channel the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new channel successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Param('channelId') channelId: string,
        @Body() createChannelDetailDto: CreateChannelDetailDto
    ) {
        return { channelId, createChannelDetailDto }
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a channel', description: 'This will be used to update a channel details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the channel successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('channelId') channelId: string,
        @Param('id') id: string,
        @Body() updateChannelDetailDto: UpdateChannelDetailDto
    ) {
        return { id, updateChannelDetailDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a channel', description: 'This will be used to delete a channel but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the channel successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(
        @Param('channelId') channelId: string,
        @Param('id') id: string
    ){
        return { id, channelId }
    }
}
