import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix("api/v1");

  const config = new DocumentBuilder()
    .setTitle("CyberQuest API")
    .setDescription("The CyberQuest platform REST API")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("auth")
    .addTag("users")
    .addTag("labs")
    .addTag("challenges")
    .addTag("gamification")
    .addTag("teams")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`CyberQuest API running on port ${port}`);
}

bootstrap();
