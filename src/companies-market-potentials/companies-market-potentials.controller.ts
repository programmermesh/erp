import { Controller, Get, Post, Patch, Delete } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies Market Potentials')
@Controller()
export class CompaniesMarketPotentialsController {
    @Get('/companies/:companyId/market_potentials')
    @ApiOperation({ summary: 'Get all company market potentials', description: 'This will be used to get a list of company market potentials'  })
    @ApiResponse({ status: 200, description: 'List of company market potentials fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company market potentials response data object'
    }

    @Get('/companies/:companyId/market_potentials/:id')
    @ApiOperation({ summary: 'Get a company market potential' , description: 'This will be used to get the a company market potential using the ID' })
    @ApiResponse({ status: 200, description: 'company market potentials fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET company market potentials response data object'
    }

    @Post('/companies/:companyId/market_potentials')
    @ApiOperation({summary: 'Register a company market potential', description: 'This will be used to create a new company market potential' })
    @ApiResponse({ status: 200, description: 'Creating new company market potential successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/companies/:companyId/market_potentials/:id')
    @ApiOperation({ summary: 'Update a company market potentials', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company market potentials details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company market potentials response data object'
    }

    @Delete('/companies/:companyId/market_potentials/:id')
    @ApiOperation({ summary: 'Delete a company market potential', description: 'This will be used to delete a company market potential' })
    @ApiResponse({ status: 200, description: 'Deleting of the company market potential successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company market potential response data object'
    }
}
