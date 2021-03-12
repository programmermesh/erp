import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  UsePipes,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '../../common/guards';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResendEmailDto } from './dto/resend-email.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FILETYPE } from '../../common/enum_values';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all users',
    description:
      'This will be used to get a list of user profiles but restricted to super admin only',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users fetching successful.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUsers() {
    return await this.userService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get a user profile',
    description: 'This will get the currently logged in user profile',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile fetching successful.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserById(@Request() req) {
    return await this.userService.getUserById(req.user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiOperation({
    summary: 'Register a user',
    description: 'This will be used to create a new user / register',
  })
  @ApiResponse({ status: 200, description: 'Creating new user successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    //return {createUserDto, message: 'Successful'}
    return await this.userService.createUser(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/verify_email/:id')
  @ApiOperation({
    summary: 'Verify a user',
    description: 'Account Verification',
  })
  @ApiResponse({ status: 200, description: 'Creating new user successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiParam({ name: 'id' })
  async verifyEmail(@Param('id') id: any) {
    return await this.userService.verifyEmail(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/resendVerifyEmail')
  @ApiOperation({
    summary: 'Resend Verification Email',
    description: 'Resend Verification Email',
  })
  @ApiResponse({ status: 200, description: 'Creating new user successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async resendVerifyEmail(@Body() resendEmailDto: ResendEmailDto) {
    return await this.userService.resendVerifyEmail(resendEmailDto);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Patch('/onboarding/:id')
  // @ApiOperation({
  //   summary: 'Onboarding user',
  //   description: 'Onboarding user',
  // })
  // @ApiResponse({ status: 200, description: 'Creating new user successful.' })
  // @ApiResponse({ status: 401, description: 'Unauthorized' })
  // @ApiBody({ type: OnboardingDto })
  // @ApiParam({ name: 'id' })
  // async onboarding(@Param('id') id: any, @Body() onboardingDto: OnboardingDto) {
  //   return await this.userService.onboarding(id, onboardingDto);
  // }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a user',
    description: 'This will be used to update a profile details using the ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Updating the user details successful.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(req.user, updateUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/me/profile_photo')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user profile image',
    description: 'This will be used to upload the user profile image',
  })
  @ApiResponse({
    status: 200,
    description: 'Updating the user details successful.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePhoto(@Request() req, @UploadedFile() file: any) {
    return await this.userService.uploadProfilePhoto(
      req.user,
      file,
      FILETYPE.user_profile_photo,
    );
  }

  @Delete('/me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a user',
    description: 'This will be used to delete currently logged in user',
  })
  @ApiResponse({ status: 200, description: 'Deleting of the user successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteUser(@Request() req) {
    return await this.userService.deleteUser(req.user);
  }
}
