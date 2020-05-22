import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

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
    getById(): string {
        return 'This will replaced with a GET customer segments response data object'
    }

    @Post()
    @ApiOperation({summary: 'Create a customer segment', description: 'This will be used to create a new customer segment the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new customer segment successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a customer segment', description: 'This will be used to update a customer segment details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the customer segment successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE customer segment response data object'
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a customer segment', description: 'This will be used to delete a customer segment but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the customer segment successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE customer segment response data object'
    }
}
