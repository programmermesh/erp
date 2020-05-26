import { Controller, Post, UseInterceptors,  UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

// Will use aws-sdk multer multer-s3 to upload to s3

@ApiTags('Upload Company Logo and Profile Photo')
@Controller()
export class CompaniesPhotosController {

    @Post('/companies/:id/logo')
    @ApiOperation({
        summary: 'Upload a company logo',
        description: 'This will be used to upload a company logo. Will use AWS S3 to upload the photos to' 
    })
    @ApiResponse({ status: 200, description: 'Upload a company logo successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    uploadLogo(): string {
        return 'This will replaced with a POST response data object'
    }

    @Post('/companies/:id/profile_photo')
    @ApiOperation({
        summary: 'Upload a company profile photo', 
        description: 'This will be used to create a new company profile photo. Will use AWS S3 to upload the photos to' 
    })
    @ApiResponse({ status: 200, description: 'Upload a company profile photo successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    uploadProfilePhoto(): string {
        return 'This will replaced with a POST response data object'
    }
}

