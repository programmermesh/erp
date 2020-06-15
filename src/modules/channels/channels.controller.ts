import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { ChannelsService } from './channels.service'
import { CreateChannelDto } from './dto/create-channel.dto'
import { UpdateChannelDto } from './dto/update-channel.dto'

@ApiTags('Channels (System Data)')
@Controller('relations/:relationId/channels')
export class ChannelsController {
    constructor(
        private readonly channelsService: ChannelsService
    ){}
    @Get()
    @ApiOperation({ summary: 'Get all channels', description: 'This will be used to get a list of channels and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of channels fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId
    ) {
        return this.channelsService.getAll(params)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a channels' , description: 'This will be used to get the a channels using the ID' })
    @ApiResponse({ status: 200, description: 'channels fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId
    ) {
        return this.channelsService.getById(params)
    }

    @Post()
    @ApiOperation({summary: 'Create a channel', description: 'This will be used to create a new channel the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new channel successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Body() createChannelDto: CreateChannelDto
    ){
        return this.channelsService.create(params, createChannelDto)
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a channel', description: 'This will be used to update a channel details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the channel successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Body() updateChannelDto: UpdateChannelDto
    ){
        return this.channelsService.update(params,updateChannelDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a channel', description: 'This will be used to delete a channel but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the channel successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId
    ) {
        return this.channelsService.delete(params)
    }
}
