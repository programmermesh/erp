import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { FILETYPE } from '../../common/enum_values';
import { imageFileFilter } from '../../common/uploaded_file_filter'
import { CompaniesPitchDecksService } from './companies-pitch-decks.service'
import { CreateCompanyPitchDeckDto } from './dto/create-company-pitch-deck.dto'
import { UpdateCompanyPitchDeckDto } from './dto/update-company-pitch-deck.dto'
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Companies Pitch Decks')
@Controller('/companies/:companyId/pitch_decks')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesPitchDecksController {
    
    constructor(
        private readonly companiesPitchDecksService: CompaniesPitchDecksService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company pitch decks', description: 'This will be used to get a list of company pitch decks'  })
    @ApiResponse({ status: 200, description: 'List of company pitch decks fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string, 
        @Request() req
    ) {
        return this.companiesPitchDecksService.getAll(params,req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company pitch decks profile' , description: 'This will be used to get the a company pitch decks using the ID' })
    @ApiResponse({ status: 200, description: 'company pitch decks profile fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,                
        @Param('id') id: string,
        @Request() req
    ){
        return this.companiesPitchDecksService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company pitch decks', description: 'This will be used to create a new company pitch decks' })
    @ApiResponse({ status: 200, description: 'Creating new company pitch decks successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Request() req,
        @Body() createCompanyPitchDeckDto: CreateCompanyPitchDeckDto
    ) {
        return this.companiesPitchDecksService.create(
            params,
            req.user,
            createCompanyPitchDeckDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company pitch decks', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company pitch decks details successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,                
        @Param('id') id: string,
        @Request() req,
        @Body() updateCompanyPitchDeckDto: UpdateCompanyPitchDeckDto
    ){
        return this.companiesPitchDecksService.update(
            params,
            req.user,
            updateCompanyPitchDeckDto
        )
    }

    @Post('/:id/upload_cover_photo')
    @ApiOperation({summary: 'Upload a pitch deck cover photo', description: 'This will be used Upload a pitch deckcover photo using its ID' })
    @ApiResponse({ status: 200, description: 'Upload and update of the photo successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    @UseInterceptors(
        FileInterceptor('file',{
            fileFilter: imageFileFilter
        })
    )
    uploadfile(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,                
        @Param('id') id: string,
        @Request() req,
        @UploadedFile() file: any
    ){
        return this.companiesPitchDecksService.uploadCoverPhoto(
            params,
            req.user,
            file,
            FILETYPE.pitch_decks_image
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company pitch decks', description: 'This will be used to delete a company pitch decks ' })
    @ApiResponse({ status: 200, description: 'Deleting of the company pitch decks successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,                
        @Param('id') id: string,
        @Request() req
    ) {
        return this.companiesPitchDecksService.delete(params,req.user)
    }
}
