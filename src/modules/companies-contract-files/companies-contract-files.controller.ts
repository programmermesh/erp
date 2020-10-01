import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { FILETYPE } from '../../common/enum_values';
import { pdfOrWordFileFilter } from '../../common/uploaded_file_filter'
import { CompaniesContractFilesService } from './companies-contract-files.service'
import { CreateContractFileDto } from './dto/create.dto'
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Companies Contract Files')
@Controller('/companies/:companyId/contracts/:contractId/files')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesContractFilesController {
     
    constructor(
        private readonly companiesContractFilesService: CompaniesContractFilesService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company contract files', description: 'This will be used to get a list of company contract files'  })
    get(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesContractFilesService.getAll(params,req.user)
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a company contract files' , description: 'This will be used to get the a company contract files using the ID' })
    getById(
        @Param() params: ValidParamId, 
        @Request() req
    ){
        return this.companiesContractFilesService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company contract files', description: 'This will be used to create a new company contract files' })
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
        return this.companiesContractFilesService.uploadFile(
            params,
            file,
            FILETYPE.contract_file_url,
            req.user
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company contract files', description: 'This will be used to delete a company contract files' })
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesContractFilesService.delete(params,req.user)
    }
}


