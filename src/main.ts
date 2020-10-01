import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'


async function bootstrap () {
  const API_PREFIX = 'v1/api'
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix(API_PREFIX)

  const options = new DocumentBuilder()
    .setTitle('VIBRANT CREATOR backend API v1.0')
    .setDescription('Vibrant Creator api will be the backend data server for the frontend web app.')
    .setVersion('1.0')
    .setBasePath(API_PREFIX)
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
