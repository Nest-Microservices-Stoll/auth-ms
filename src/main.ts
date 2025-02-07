import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import envs from './config/envs';
import { Logger, ValidationPipe } from '@nestjs/common';


async function bootstrap() {


  const logger = new Logger('Auth-MS')


  console.log(envs.natsServers)

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS,
    options: {
      servers: envs.natsServers,
    }
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  await app.listen();




  logger.log(`Microserivces started on port ${envs.port}`)


}
bootstrap();
