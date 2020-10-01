import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { CreateSegmenationDto } from './dto/createDto'
import { UpdateSegmenationDto } from './dto/updateDto'
import { ValidParamId } from '../../common/valid-param-id.dto'
import { SegmentationsService } from './segmentations.service'

@ApiTags('Customer Segmentations (System Data)')
@Controller('segmentations')
export class SegmentationsController {
    constructor(private readonly segmentationsService: SegmentationsService){}

    @Get()
    @ApiOperation({ summary: 'Get all customer Segmentations', description: 'This will be used to get a list of Segmentations and restricted to super admin only'  })
    get() {
        return this.segmentationsService.getAll()
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a customer Segmentations' , description: 'This will be used to get the a Segmentations using the ID' })
    getById(
        @Param() params: ValidParamId
    ) {
        return this.segmentationsService.getById(params.id)
    }

    @Post()
    @ApiOperation({summary: 'Create a Segmentation', description: 'This will be used to create a new Segmentation the will be used in the system but restricted to super admin' })
    create(@Body() createSegmenationDto: CreateSegmenationDto) {
        return this.segmentationsService.create(createSegmenationDto)
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a Segmentations', description: 'This will be used to update a Segmentation details using the ID but only restricted to the super admin' })
    update(
        @Param() params: ValidParamId,
        @Body() updateSegmenationDto: UpdateSegmenationDto
    ) {
        return this.segmentationsService.update(params.id,updateSegmenationDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a Segmentations', description: 'This will be used to delete a Segmentation but restricted to super admin only' })
    delete( 
        @Param() params: ValidParamId
    ) {
        return this.segmentationsService.delete(params.id)
    }
}
