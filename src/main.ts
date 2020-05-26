import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'


async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  const options = new DocumentBuilder()
    .setTitle('VIBRANT CREATOR backend API v1.0')
    .setDescription('Vibrant Creator api will be the backend data server for the frontend web app.')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
