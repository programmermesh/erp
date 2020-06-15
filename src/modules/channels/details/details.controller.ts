import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../../common/valid-param-id.dto'
import { CreateChannelDetailDto } from './dto/create-channel-details.dto'
import { UpdateChannelDetailDto } from './dto/update-channel-details.dto'
import { DetailsService } from './details.service'

@ApiTags('Channels Details (System Data)')
@Controller('relations/:relationId/channels/:channelId/details')
export class DetailsController {
    constructor(
        private readonly detailsService: DetailsService
    ){}
    @Get()
    @ApiOperation({ summary: 'Get all channel details', description: 'This will be used to get a list of channel details and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of channel details fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId
    ) {
        return this.detailsService.getAll(params)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a channel details' , description: 'This will be used to get the a channel details using the ID' })
    @ApiResponse({ status: 200, description: 'channel details fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId
    ) {
        return this.detailsService.getById(params)
    }

    @Post()
    @ApiOperation({summary: 'Create a channel', description: 'This will be used to create a new channel the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new channel successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Body() createChannelDetailDto: CreateChannelDetailDto
    ) {
        return this.detailsService.create(params,createChannelDetailDto)
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a channel', description: 'This will be used to update a channel details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the channel successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Body() updateChannelDetailDto: UpdateChannelDetailDto
    ) {
        return this.detailsService.update(params,updateChannelDetailDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a channel', description: 'This will be used to delete a channel but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the channel successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId
    ){
        return this.detailsService.delete(params)
    }
}
