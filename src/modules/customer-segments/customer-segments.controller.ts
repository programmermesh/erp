import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateCustomerSegmentDto } from './dto/create-customer-segment.dto'
import { UpdateCustomerSegmentDto } from './dto/update-customer-segment.dto'
import { ValidParamId } from '../../common/valid-param-id.dto'

@ApiTags('Customer Segment (System Data)')
@Controller('customer_segments')
export class CustomerSegmentsController {
    @Get()
    @ApiOperation({ summary: 'Get all customer segments', description: 'This will be used to get a list of customer segments and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of customer segments fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all customer segments response data object'
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a customer segments' , description: 'This will be used to get the a customer segments using the ID' })
    @ApiResponse({ status: 200, description: 'Customer segments fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(@Param('id') id: ValidParamId): string {
        return 'This will replaced with a GET customer segments response data object'
    }

    @Post()
    @ApiOperation({summary: 'Create a customer segment', description: 'This will be used to create a new customer segment the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new customer segment successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(@Body() createCustomerSegmentDto: CreateCustomerSegmentDto) {
        return createCustomerSegmentDto
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a customer segment', description: 'This will be used to update a customer segment details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the customer segment successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: ValidParamId,
        @Body() updateCustomerSegment: UpdateCustomerSegmentDto
    ) {
        return updateCustomerSegment
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a customer segment', description: 'This will be used to delete a customer segment but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the customer segment successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete( @Param('id') id: ValidParamId ): string {
        return 'This will replaced with a DELETE customer segment response data object'
    }
}
