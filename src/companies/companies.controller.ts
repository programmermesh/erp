import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud'
import { CompaniesService } from './companies.service'
import { CompanyEntity } from './company.entity'

@Crud({
    model: {
        type: CompanyEntity
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true
        }
    },
    routes: {
        exclude: ["deleteOneBase", 'replaceOneBase'],
    },
    // dto
})

@Controller('companies')
export class CompaniesController {
    constructor (public service: CompaniesService){}
}
