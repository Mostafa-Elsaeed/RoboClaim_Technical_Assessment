import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";

// Local Imports
import { AppModule } from "./app.module";
import { catchErrors } from "./global-helpers/catch-errors";

async function startApp() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}

async function bootstrap() {
  const [app, error] = await catchErrors(() => startApp());

  if (error) {
    Logger.error("Error starting application:", error);
    process.exit(1);
  }
}

bootstrap();
