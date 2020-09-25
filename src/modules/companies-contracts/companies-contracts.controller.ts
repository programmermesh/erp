import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation,  ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { FILETYPE } from '../../common/enum_values';
import { imageFileFilter } from '../../common/uploaded_file_filter'
import { CompaniesContractsService } from './companies-contracts.service'
import { CreateCompanyContractDto } from './dto/create.dto'
import { UpdateCompanyContractDto } from './dto/update.dto'
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Companies Contracts')
@Controller('/companies/:companyId/contracts')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesContractsController {
    
    constructor(
        private readonly companiesContractsService: CompaniesContractsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all company contracts', description: 'This will be used to get a list of company contracts'  })
    get(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesContractsService.getAll(params,req.user)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company contract' , description: 'This will be used to get the a company contract using the ID' })
    getById(
        @Param() params: ValidParamId,
        @Request() req
    ){
        return this.companiesContractsService.getById(params, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company contract', description: 'This will be used to create a new company contract' })
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createCompanyContractDto: CreateCompanyContractDto
    ) {
        return this.companiesContractsService.create(
            params,
            req.user,
            createCompanyContractDto
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company contract', description: 'This will be used to update a contract details using the ID' })
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateCompanyContractDto: UpdateCompanyContractDto
    ){
        return this.companiesContractsService.update(
            params,
            req.user,
            updateCompanyContractDto
        )
    }

    @Post('/:id/upload_cover_photo')
    @ApiOperation({summary: 'Upload a contract cover photo', description: 'This will be used Upload a contract cover photo using its ID' })
    @UseInterceptors(
        FileInterceptor('file',{
            fileFilter: imageFileFilter
        })
    )
    uploadfile(
        @Param() params: ValidParamId,
        @Request() req,
        @UploadedFile() file: any
    ){
        return this.companiesContractsService.uploadCoverPhoto(
            params,
            req.user,
            file,
            FILETYPE.contract_image
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a company contract', description: 'This will be used to delete a company contract ' })
    delete(
        @Param() params: ValidParamId,
        @Request() req
    ) {
        return this.companiesContractsService.delete(params,req.user)
    }
}

