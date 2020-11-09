import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { UserSessionsService } from './user-sessions.service'
import { CreateUserSessionDto as CreateDto } from './dto/create.dto'
import { UpdateUserSessionDto as UpdateDto } from './dto/update.dto'
import { SearchDto } from './dto/search.dto';

@ApiTags('User Sessions')
@Controller('/users_sessions')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UserSessionsController {
    
    constructor(
        private readonly userSessionsService: UserSessionsService
    ){}

    @Get()
    @ApiOperation({ summary: 'Get all user sessions', description: 'This will be used to get a list of user session'  })
    get(
        @Request() req,
        @Query() searchDto: SearchDto
    ) {
        return this.userSessionsService.getAll(req.user, searchDto)
    }

    @Get('/statistics/data')
    @ApiOperation({ summary: 'Get dated statistics data ', description: 'This will be used to get a list combined statistic of user session'  })
    getDatedStatisticData(
        @Request() req,
        @Query() searchDto: SearchDto
    ) {
        return this.userSessionsService.getDatedStatisticData(req.user, searchDto)
    }

    @Get('/statistics/users')
    @ApiOperation({ summary: 'Get dated user data ', description: 'This will be used to get a list combined statistic of user session'  })
    getDatedUserStatisticData(
        @Request() req,
        @Query() searchDto: SearchDto
    ) {
        return this.userSessionsService.getDatedUserStatisticData(req.user, searchDto)
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a company pitch decks profile' , description: 'This will be used to get the a company pitch decks using the ID' })
    getById(
        @Param() params: ValidParamId,           
        @Request() req
    ){
        return this.userSessionsService.getById(params, req.user)
    }

    @Get('/bytoken/:token')
    @ApiOperation({ summary: 'Get a company pitch decks profile' , description: 'This will be used to get the a company pitch decks using the ID' })
    getByToken(
        @Param('token') token: string,           
        @Request() req
    ){
        return this.userSessionsService.getByToken(token, req.user)
    }

    @Post()
    @ApiOperation({summary: 'Register a company pitch decks', description: 'This will be used to create a new company pitch decks' })
    @ApiResponse({ status: 200, description: 'Creating new company pitch decks successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() createDto: CreateDto
    ) {
        return this.userSessionsService.create(
            createDto,
            req.user,
        )
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a company pitch decks', description: 'This will be used to update a profile details using the ID' })
    @ApiResponse({ status: 200, description: 'Updating the company pitch decks details successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Request() req,
        @Body() updateDto: UpdateDto
    ){
        return this.userSessionsService.update(
            params,
            updateDto,
            req.user,
        )
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a user session', description: 'This will be used to delete a users session ' })
    delete(
        @Param() params: ValidParamId,
        @Param('companyId') companyId: string,                
        @Param('id') id: string,
        @Request() req
    ) {
        return this.userSessionsService.delete(params,req.user)
    }
}

