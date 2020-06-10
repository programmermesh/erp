import { Request, Controller, Post, UseInterceptors,  UploadedFile, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompaniesPhotosService } from './companies-photos.service'
import { FILETYPE } from '../../common/enum_values';

@ApiTags('Upload Company Logo and Profile Photo')
@Controller('/companies/:companyId')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesPhotosController {
    
    constructor(
        private readonly companiesPhotosService: CompaniesPhotosService
    ){}

    @Post('/logo')
    @ApiOperation({
        summary: 'Upload a company logo',
        description: 'This will be used to upload a company logo. Will use AWS S3 to upload the photos to' 
    })
    @ApiResponse({ status: 200, description: 'Upload a company logo successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    @UseInterceptors(FileInterceptor('file'))
    uploadLogo(
        @Param() params: ValidParamId,
        @Request() req,
        @UploadedFile() file: any
    ){
        return this.companiesPhotosService.uploadFile(
            params,
            file,
            FILETYPE.logo,
            req.user
        )
    }

    @Post('/profile_photo')
    @ApiOperation({
        summary: 'Upload a company profile photo', 
        description: 'This will be used to create a new company profile photo. Will use AWS S3 to upload the photos to' 
    })
    @ApiResponse({ status: 200, description: 'Upload a company profile photo successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    @UseInterceptors(FileInterceptor('file'))
    uploadProfilePhoto(
        @Param() params: ValidParamId,
        @Request() req,
        @UploadedFile() file: any
    ){
        return this.companiesPhotosService.uploadFile(
            params,
            file,
            FILETYPE.profile_photo,
            req.user
        )
    }
}

