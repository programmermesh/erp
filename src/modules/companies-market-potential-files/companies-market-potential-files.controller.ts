import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { FILETYPE } from '../../common/enum_values';
import { pdfOrWordFileFilter } from '../../common/uploaded_file_filter'
import { CompaniesMarketPotentialFilesService } from './companies-market-potential-files.service'
import { CreateMarketPotentialsFileDto } from './dto/create-companies-market-potential-files.dto'
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Companies Market Potentials Files')
@Controller('/companies/:companyId/market_potentials/:market_potentialId/files')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesMarketPotentialFilesController {
     
    constructor(
        private readonly companiesMarketPotentialFilesService: CompaniesMarketPotentialFilesService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company market potentials', description: 'This will be used to get a list of company market potential files'  })
    @ApiResponse({ status: 200, description: 'List of company market potential files fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(
        @Param() params: ValidParamId,@Param('companyId') companyId: string,
        @Param('market_potentialId') market_potentialId: string,
        @Request() req
    ){
        return this.companiesMarketPotentialFilesService.getAll(params,req.user)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a company market potential files' , description: 'This will be used to get the a company market potential files using the ID' })
    @ApiResponse({ status: 200, description: 'company market potential files fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId,@Param('companyId') companyId: string,
        @Param('market_potentialId') market_potentialId: string,                
        @Param('id') id: string,
        @Request() req
    ){
        return this.companiesMarketPotentialFilesService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company market potential files', description: 'This will be used to create a new company market potential files' })
    @ApiResponse({ status: 200, description: 'Creating new company market potential files successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    @UseInterceptors(
        FileInterceptor('file',{
            fileFilter: pdfOrWordFileFilter
        })
    )
    uploadfile(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('market_potentialId') market_potentialId: string,
        @Request() req,
        @UploadedFile() file: any
    ){
        return this.companiesMarketPotentialFilesService.uploadFile(
            params,
            file,
            FILETYPE.market_potential_file_url,
            req.user
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company market potential files', description: 'This will be used to delete a company market potential files' })
    @ApiResponse({ status: 200, description: 'Deleting of the company market potential files successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,
        @Param('market_potentialId') market_potentialId: string,                
        @Param('id') id: string,
        @Request() req
    ) {
        return this.companiesMarketPotentialFilesService.delete(params,req.user)
    }
}

