import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies Customers Segmentations')
@Controller()
export class CompaniesCustomersSegmentationsController {
    @Get('/companies/:companyId/customers_segmentations')
    @ApiOperation({ summary: 'Get all company customer segmentations', description: 'This will be used to get a list of company customer segmentations'  })
    @ApiResponse({ status: 200, description: 'List of company customer segmentations fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company customer segmentations response data object'
    }

    @Get('/companies/:companyId/customers_segmentations/:id')
    @ApiOperation({ summary: 'Get a company customer segmentation' , description: 'This will be used to get the a company customer segmentation using the ID' })
    @ApiResponse({ status: 200, description: 'company customer segmentations fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET company customer segmentations response data object'
    }

    @Post('/companies/:companyId/customers_segmentations')
    @ApiOperation({summary: 'Register a company customer segmentation', description: 'This will be used to create a new company customer segmentation' })
    @ApiResponse({ status: 200, description: 'Creating new company customer segmentation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/companies/:companyId/customers_segmentations/:id')
    @ApiOperation({ summary: 'Update a company customer segmentations', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company customer segmentations details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company customer segmentations response data object'
    }

    @Delete('/companies/:companyId/customers_segmentations/:id')
    @ApiOperation({ summary: 'Delete a company customer segmentation', description: 'This will be used to delete a company customer segmentation' })
    @ApiResponse({ status: 200, description: 'Deleting of the company customer segmentation successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company customer segmentation response data object'
    }
}
