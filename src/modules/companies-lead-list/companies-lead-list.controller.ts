import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'

import { ValidParamId } from '../../common/valid-param-id.dto'
import { AuthGuard } from '../../common/guards'
import { CompaniesLeadListService } from './companies-lead-list.service'
import { CreateLeadListDto } from './dto/create-company-lead-list.dto'
import { UpdateLeadListDto } from './dto/update-company-lead-list.dto'

@ApiTags('Companies Lead List')
@Controller('/companies/:companyId/lead_lists')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompaniesLeadListController {
    
    constructor(
        private readonly companiesLeadListService: CompaniesLeadListService
    ){}

    // @Get()
    // @ApiOperation({ summary: 'Get all company lead list', description: 'This will be used to get a list of company lead list'  })
    // @ApiResponse({ status: 200, description: 'List of company lead list fetching successful.'})
    // @ApiResponse({ status: 401, description: 'Unauthorized'})
    // get(
    //     @Param() params: ValidParamId,
    //     @Param('companyId') companyId: string,
    //     @Request() req
    // ){
    //     return this.companiesLeadListService.getAll(params,req.user)
    // }

    // @Get('/:id')
    // @ApiOperation({ summary: 'Get a company lead list profile' , description: 'This will be used to get the a company lead list using the ID' })
    // @ApiResponse({ status: 200, description: 'company lead list profile fetching successful.'})
    // @ApiResponse({ status: 401, description: 'Unauthorized'})
    // getById(
    //     @Param() params: ValidParamId,
    //     @Param('companyId') companyId: string,
    //     @Param('id') id: string,
    //     @Request() req
    // ) {
    //     return this.companiesLeadListService.getById(params,req.user)
    // }

    // @Post()
    // @ApiOperation({summary: 'Register a company lead list', description: 'This will be used to create a new company lead list' })
    // @ApiResponse({ status: 200, description: 'Creating new company lead list successful.'})
    // create(
    //     @Param() params: ValidParamId,
    //     @Param('companyId') companyId: string,
    //     @Request() req,
    //     @Body() createLeadListDto: CreateLeadListDto
    // ) {
    //     if(createLeadListDto.added_lead_company === params.companyId ){
    //         throw new BadRequestException('Error: ID given is the same as the company ID')
    //     }
    //     return this.companiesLeadListService.create(
    //         params,
    //         req.user,
    //         createLeadListDto
    //     )
    // }

    // @Patch('/:id')
    // @ApiOperation({ summary: 'Update a company lead list', description: 'This will be used to update a profile details using the ID' })
    // @ApiResponse({ status: 200, description: 'Updating the company lead list details successful.'})
    // @ApiResponse({ status: 401, description: 'Unauthorized'})
    // update(
    //     @Param() params: ValidParamId,
    //     @Param('companyId') companyId: string,
    //     @Param('id') id: string,
    //     @Request() req,
    //     @Body() updateLeadListDto: UpdateLeadListDto
    // ) {
    //     return this.companiesLeadListService.update(
    //         params,
    //         req.user,
    //         updateLeadListDto
    //     )
    // }

    // @Delete('/:id')
    // @ApiOperation({ summary: 'Delete a company lead list', description: 'This will be used to delete a company lead list ' })
    // @ApiResponse({ status: 200, description: 'Deleting of the company lead list successful.'})
    // @ApiResponse({ status: 401, description: 'Unauthorized'})
    // delete(
    //     @Param() params: ValidParamId,
    //     @Param('companyId') companyId: string,
    //     @Param('id') id: string,
    //     @Request() req
    // ) {
    //     return this.companiesLeadListService.delete(params, req.user)
    // }
}
