import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { CatchEverythingFilter } from './common/filters/http-exception.filter';

dotenv.config(); // Load environment variables

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  app.enableCors({
    origin: 'http://localhost:5174',
    credentials: true, // Allow cookies to be sent
  });
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter));
  await app.listen(process.env.PORT ?? 5176);
}
bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
});
