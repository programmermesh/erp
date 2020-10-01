import { Injectable, NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import * as AWS from 'aws-sdk'

import { ValidParamId } from '../../common/valid-param-id.dto';
import { FILETYPE } from '../../common/enum_values'
import { UserEntity as User } from '../users/user.entity'
import { CompanyEntity as Company } from '../companies/company.entity'

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
const s3 = new AWS.S3()
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

@Injectable()
export class CompaniesPhotosService {
    constructor(
        @InjectRepository(Company) private readonly companyRepo: Repository<Company>
    ){}
    private logger = new Logger('CompanyPhotoService')

    async uploadFile(params: ValidParamId, file: any, fileType: FILETYPE, ){

        const companyFound = await this.companyRepo.findOne({
            where: {
                id: params.companyId,
                //created_by: user
            }
        })

        if(!companyFound){
            throw new NotFoundException(`Company with ID '${params.id}' not found`)
        }

        this.logger.debug('Uploading file')
        const urlKey = `${fileType}/${params.companyId}/${Date.now().toString()}-${file.originalname}`
        const aws_s3_region_url = `https://${AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${urlKey}`
        
        const data = await s3
            .putObject({
                Bucket: AWS_S3_BUCKET_NAME,
                Body: file.buffer,
                Key: urlKey,
                ACL: 'public-read'
            })
            .promise()
            .then(
                data => {
                    return { success: true, url: aws_s3_region_url }
                },
                err => {
                    this.logger.debug('Error Uploading')
                    this.logger.debug(err)
                    throw new InternalServerErrorException()
                }
            )
        
        //save the file to the appropriate table
        if(data.success){
            companyFound[fileType] = data.url //logo or profile_
            const updateLogo = await this.companyRepo.save(companyFound)
            return Promise.resolve({
                status: 'success',
                result: {logo: updateLogo.logo, profile_photo: updateLogo.profile_photo}
            })
        }else{
            this.logger.error(data)
            throw new InternalServerErrorException()
        }
    }
}
