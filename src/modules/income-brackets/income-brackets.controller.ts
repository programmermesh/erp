import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ValidParamId } from '../../common/valid-param-id.dto';


import { CreateIncomeBracketDto } from './dto/create-income-bracket.dto'
import { UpdateIncomeBracketDto } from './dto/update-income-bracket.dto'

@ApiTags('Income Bracket (System Data)')
@Controller('income_brackets')
export class IncomeBracketsController {
    @Get()
    @ApiOperation({ summary: 'Get all income brackets', description: 'This will be used to get a list of income brackets and restricted to super admin only'  })
    @ApiResponse({ status: 200, description: 'List of income brackets fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    get(): string {
        return 'This will replaced with a GET all income brackets response data object'
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a income brackets' , description: 'This will be used to get the a income brackets using the ID' })
    @ApiResponse({ status: 200, description: 'income brackets fetching successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    getById(@Param('id') id: ValidParamId): string {
        return 'This will replaced with a GET income brackets response data object'
    }

    @Post()
    @ApiOperation({summary: 'Create a income bracket', description: 'This will be used to create a new income bracket the will be used in the system but restricted to super admin' })
    @ApiResponse({ status: 200, description: 'Creating new income bracket successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    create(
        @Body() createIncomeBracketDto: CreateIncomeBracketDto
    ) {
        return createIncomeBracketDto
    }

    @Patch('/:id')
    @ApiOperation({ summary: 'Update a income bracket', description: 'This will be used to update a income bracket details using the ID but only restricted to the super admin' })
    @ApiResponse({ status: 200, description: 'Updating the income bracket successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    update(
        @Param('id') id: ValidParamId,
        @Body() updateIncomeBracketDto: UpdateIncomeBracketDto
    ){
        return {id, updateIncomeBracketDto }
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete a income bracket', description: 'This will be used to delete a income bracket but restricted to super admin only' })
    @ApiResponse({ status: 200, description: 'Deleting of the income bracket successful.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    delete(@Param('id') id: ValidParamId): string {
        return 'This will replaced with a DELETE income bracket response data object'
    }
}
