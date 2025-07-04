import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// LOCAL IMPORTS
import config from './configs/env/env.configs';

import { envValidationSchema } from './configs/env/validation.schema';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/database.config';
import { UploadModule } from './upload/upload.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      cache: true,
      // envFilePath: [".env"],
      validationSchema: envValidationSchema,  
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
    RabbitmqModule,
    AuthModule,
    UsersModule,
    UploadModule,
    FileModule,
  ],
})
export class AppModule {}
