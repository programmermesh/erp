import { Controller, Post, UseInterceptors,  UploadedFile, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadLogoDto } from './dto/upload-logo.dto'
import { UploadProfilePhotoDto } from './dto/upload-profile-photo.dto'

// Will use aws-sdk multer multer-s3 to upload to s3

@ApiTags('Upload Company Logo and Profile Photo')
@Controller('/companies/:id')
export class CompaniesPhotosController {

    @Post('/logo')
    @ApiOperation({
        summary: 'Upload a company logo',
        description: 'This will be used to upload a company logo. Will use AWS S3 to upload the photos to' 
    })
    @ApiResponse({ status: 200, description: 'Upload a company logo successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @UseInterceptors(FileInterceptor('logo'))
    uploadLogo(
        @Param('id') company_id: string,
        @UploadedFile() logo: UploadLogoDto,
        @Body() logo_file: UploadLogoDto
    ){
        return { company_id, logo }
    }

    @Post('/profile_photo')
    @ApiOperation({
        summary: 'Upload a company profile photo', 
        description: 'This will be used to create a new company profile photo. Will use AWS S3 to upload the photos to' 
    })
    @ApiResponse({ status: 200, description: 'Upload a company profile photo successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @UseInterceptors(FileInterceptor('profile_photo'))
    uploadProfilePhoto(
        @Param('id') company_id: string,
        @UploadedFile() profile_photo: UploadProfilePhotoDto,
        @Body() profile_photo_file: UploadProfilePhotoDto
    ){
        return { company_id, profile_photo }
    }
}

