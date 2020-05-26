import { Controller, Post, Patch, Get, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger'

import { LoginDto } from './dto/login-dto'
import { RefreshTokenDto } from './dto/token-refresh.dto'
import { ResetPasswordRequestDto, UpdatePasswordRequestDto } from './dto/reset-password-dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    @Post('/login')
    @ApiOperation({ summary: 'Login a user', description: 'Logins a user using an email and password then gives them a TOKEN & REFRESH_TOKEN' })
    @ApiResponse({ status: 201, description: 'Login successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    login( @Body() loginDto: LoginDto){
        return loginDto
    }

    @Post('/token') 
    @ApiOperation({ summary: 'Renew an access token', description: 'This endpoint will be used to create a new TOKEN for the user using the REFRESH_TOKEN they provide' })
    @ApiResponse({ status: 200, description: 'Token created successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    refreshToken(@Body() refreshTokenDto: RefreshTokenDto ){
        return refreshTokenDto
    }
    
    @Post('/reset_password')
    @ApiOperation({ summary:'Create password reset request', description: 'This will be used to post a request to change the password and create an entry in the reset password table' })
    requestForPasswordChange(@Body() resetPasswordDto: ResetPasswordRequestDto){
        return resetPasswordDto
    }

    @Patch('/reset_password')
    @ApiOperation({ summary: 'Update a password', description: 'This will be used to update the password of a user' })
    @ApiResponse({ status: 201, description: 'Password updated successfully.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    resetPassword(@Body() updatePasswordRequestDto: UpdatePasswordRequestDto ){
        return updatePasswordRequestDto
    }

    @Get('/logout')
    @ApiOperation({ summary: 'Logout a user', description: 'This will be used to logout the user and delete or disable the REFRESH_TOKEN and the access TOKEN' })    
    @ApiCreatedResponse({ description: 'The logout was successful.'})
    logout(): string{
        return 'The user will be able to logout using this endpoint'
    }

}