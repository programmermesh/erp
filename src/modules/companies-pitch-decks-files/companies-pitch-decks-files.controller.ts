import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { FILETYPE } from '../../common/enum_values';
import { pdfOrWordFileFilter } from '../../common/uploaded_file_filter'
import { CompaniesPitchDecksFilesService } from './companies-pitch-decks-files.service'
import { CreatePitchDeckFileDto } from './dto/create.dto'
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Companies Pitch Decks Files')
@Controller('/companies/:companyId/pitch_decks/:pitch_deckId/files')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesPitchDecksFilesController {
     
    constructor(
        private readonly companiesPitchDecksFilesService: CompaniesPitchDecksFilesService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company pitch deck files', description: 'This will be used to get a list of company pitch deck files'  })
    get(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesPitchDecksFilesService.getAll(params,req.user)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a company pitch deck files' , description: 'This will be used to get the a company pitch deck files using the ID' })
    getById(
        @Param() params: ValidParamId, 
        @Request() req
    ){
        return this.companiesPitchDecksFilesService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company pitch files', description: 'This will be used to create a new company pitch deck files' })
    @UseInterceptors(
        FileInterceptor('file',{
            fileFilter: pdfOrWordFileFilter
        })
    )
    uploadfile(
        @Param() params: ValidParamId,
        @Request() req,
        @UploadedFile() file: any
    ){
        return this.companiesPitchDecksFilesService.uploadFile(
            params,
            file,
            FILETYPE.pitch_deck_file_url,
            req.user
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company pitch deck files', description: 'This will be used to delete a company pitch deck files' })
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesPitchDecksFilesService.delete(params,req.user)
    }
}


