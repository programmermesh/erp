import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateBusinessSectorDto } from './dto/create-business-sector.dto'
import { UpdateBusinessSectorDto } from './dto/update-business-sector.dto'

@ApiTags('Business Sectors (System Data)')
@Controller('business_sectors')
export class BusinessSectorsController {
    @Get()
    @ApiOperation({ summary: 'Get all business sectors', description: 'This will be used to get a list of business sectors and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of business sectors fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all business sectors response data object'
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a business sectors' , description: 'This will be used to get the a business sectors using the ID' })
    @ApiResponse({ status: 200, description: 'business sectors fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(@Param('id') id: ValidParamId): string {
        return 'This will replaced with a GET business sectors response data object'
    }

    @Post()
    @ApiOperation({summary: 'Create a business sector', description: 'This will be used to create a new business sector the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new business sector successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Body() createBusinessSectorDto: CreateBusinessSectorDto
    ) {
        return createBusinessSectorDto
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a business sector', description: 'This will be used to update a business sector details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the business sector successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: ValidParamId,
        @Body() updateBusinessSectorDto: UpdateBusinessSectorDto
    ){
        return {id, updateBusinessSectorDto}
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a business sector', description: 'This will be used to delete a business sector but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the business sector successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(@Param('id') id: ValidParamId): string {
        return 'This will replaced with a DELETE business sector response data object'
    }
}
