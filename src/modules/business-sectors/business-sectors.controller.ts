import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto';
import { CreateBusinessSectorDto } from './dto/create-business-sector.dto'
import { UpdateBusinessSectorDto } from './dto/update-business-sector.dto'
import { BusinessSectorsService } from './business-sectors.service'

@ApiTags('Business Sectors (System Data)')
@Controller('business_sectors')
export class BusinessSectorsController {
    constructor(private readonly businessSectorsService: BusinessSectorsService){}

    @Get()
    @ApiOperation({ summary: 'Get all business sectors', description: 'This will be used to get a list of business sectors and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of business sectors fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get() {
        return this.businessSectorsService.getAll()
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a business sectors' , description: 'This will be used to get the a business sectors using the ID' })
    @ApiResponse({ status: 200, description: 'business sectors fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(@Param() params: ValidParamId) {
        return this.businessSectorsService.getById(params.id)
    }

    @Post()
    @ApiOperation({summary: 'Create a business sector', description: 'This will be used to create a new business sector the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new business sector successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Body() createBusinessSectorDto: CreateBusinessSectorDto
    ) {
        return this.businessSectorsService.create(createBusinessSectorDto)
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a business sector', description: 'This will be used to update a business sector details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the business sector successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Body() updateBusinessSectorDto: UpdateBusinessSectorDto
    ){
        return this.businessSectorsService.update(params.id, updateBusinessSectorDto)
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a business sector', description: 'This will be used to delete a business sector but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the business sector successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(@Param() params: ValidParamId){
        return this.businessSectorsService.delete(params.id)
    }
}
