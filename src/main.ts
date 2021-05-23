import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const logger = new Logger('Application')
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
  logger.verbose(`App running on port `)
}
bootstrap();
