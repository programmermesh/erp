import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('Companies Pitch Decks')
@Controller()
export class CompaniesPitchDecksController {
    @Get('/companies/:companyId/pitch_decks')
    @ApiOperation({ summary: 'Get all company pitch decks', description: 'This will be used to get a list of company pitch decks'  })
    @ApiResponse({ status: 200, description: 'List of company pitch decks fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all company pitch decks response data object'
    }

    @Get('/companies/:companyId/pitch_decks/:id')
    @ApiOperation({ summary: 'Get a company pitch decks profile' , description: 'This will be used to get the a company pitch decks using the ID' })
    @ApiResponse({ status: 200, description: 'company pitch decks profile fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(): string {
        return 'This will replaced with a GET company pitch decks response data object'
    }

    @Post('/companies/:companyId/pitch_decks')
    @ApiOperation({summary: 'Register a company pitch decks', description: 'This will be used to create a new company pitch decks' })
    @ApiResponse({ status: 200, description: 'Creating new company pitch decks successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(): string {
        return 'This will replaced with a POST response data object'
    }

    @Patch('/companies/:companyId/pitch_decks/:id')
    @ApiOperation({ summary: 'Update a company pitch decks', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company pitch decks details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(): string {
        return 'This will replaced with an UPDATE company pitch decks response data object'
    }

    @Delete('/companies/:companyId/pitch_decks/:id')
    @ApiOperation({ summary: 'Delete a company pitch decks', description: 'This will be used to delete a company pitch decks ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company pitch decks successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(): string {
        return 'This will replaced with a DELETE company pitch decks response data object'
    }
}
