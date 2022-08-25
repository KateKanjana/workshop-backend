import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const MicroservicePort = process.env.MICROSERVICE_PORT
    ? process.env.MICROSERVICE_PORT
    : 4200;

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: MicroservicePort, retryAttempts: 5, retryDelay: 3000 },
  });

  const moduleRoutingPath = `/${process.env.MODULE}`;
  app.setGlobalPrefix('api' + moduleRoutingPath);

  // const cors: string[] = process.env.CORS.split(',');
  // app.enableCors({
  //   origin: cors,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // });

  app.enableCors();

  const port = parseInt(process.env.PORT, 10) || 4002;
  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
