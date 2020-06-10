import * as AWS from 'aws-sdk'
import { InternalServerErrorException } from '@nestjs/common'
import { ValidParamId } from '../common/valid-param-id.dto'

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
const s3 = new AWS.S3()
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

export const uploadImageToS3 = async (
    params: ValidParamId,
    file: any,
    urlKey: string
) => {
    
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
    return data
}