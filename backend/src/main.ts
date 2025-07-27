import { AppModule } from '@/modules/app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  )
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
