import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { IncomeBracketsService } from './income-brackets.service'
import { CreateIncomeBracketDto } from './dto/create-income-bracket.dto'
import { UpdateIncomeBracketDto } from './dto/update-income-bracket.dto'

@ApiTags('Income Bracket (System Data)')
@Controller('income_brackets')
export class IncomeBracketsController {
    constructor(
        private readonly incomeBracketsService: IncomeBracketsService
    ){}
    @Get()
    @ApiOperation({ summary: 'Get all income brackets', description: 'This will be used to get a list of income brackets and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of income brackets fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    get(){
        return this.incomeBracketsService.getAll()
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a income brackets' , description: 'This will be used to get the a income brackets using the ID' })
    @ApiResponse({ status: 200, description: 'income brackets fetching successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    getById(
        @Param() params: ValidParamId
    ) {
        return this.incomeBracketsService.getById(params)
    }

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Create a income bracket', description: 'This will be used to create a new income bracket the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new income bracket successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    create(
        @Body() createIncomeBracketDto: CreateIncomeBracketDto
    ) {
        return this.incomeBracketsService.create(createIncomeBracketDto)
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a income bracket', description: 'This will be used to update a income bracket details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the income bracket successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    update(
        @Param() params: ValidParamId,
        @Body() updateIncomeBracketDto: UpdateIncomeBracketDto
    ){
        return this.incomeBracketsService.update(params,updateIncomeBracketDto)
    }

    @Delete('/:id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a income bracket', description: 'This will be used to delete a income bracket but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the income bracket successful.'})
    @ApiResponse({ status: 401, description: 'Unauthorized'})
    delete(@Param() params: ValidParamId) {
        return this.incomeBracketsService.delete(params)
    }
}
