import { Controller, Get, Post, Patch, Delete, Body, UsePipes, Param, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '../../common/guards'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users', description: 'This will be used to get a list of user profiles but restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of users fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getUsers() {
        return await this.userService.getUsers()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get a user profile' , description: 'This will be used to get the a user profile using the ID' })
    @ApiResponse({ status: 200, description: 'User profile fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getUserById(
        @Param('id') id: string
    ){
        return await this.userService.getUserById(id)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    @ApiOperation({summary: 'Register a user', description: 'This will be used to create a new user / register' })
    @ApiResponse({ status: 200, description: 'Creating new user successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Patch('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a user', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the user details successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto 
    ){
        return await this.userService.updateUser(id, updateUserDto)
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a user', description: 'This will be used to delete a user profiles but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the user successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async deleteUser(
        @Param('id') id: string
    ){
        return await this.userService.deleteUser(id)
    }
}
