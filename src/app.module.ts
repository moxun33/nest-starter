import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import loadConfig from './config/configurations';
import { TypeOrmModule } from '@nestjs/typeorm';

const bizModules = [AuthModule, UsersModule];
const libModules = [
  ConfigModule.forRoot({
    load: [loadConfig],
    envFilePath: process.env.NODE_ENV
      ? ['.env', `.env.${process.env.NODE_ENV}`]
      : '.env',
  }),
  ScheduleModule.forRoot(),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const { host, port, username, password, database } =
        configService.get('db');

      return {
        type: 'postgres',
        // .env 获取
        host,
        port,
        username,
        password,
        database,
        // entities

        entities: ['dist/**/*.entity{.ts,.js}'],
      };
    },
  }),
];
@Module({
  imports: [
    ...bizModules,
    ...libModules,
    /* MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
      }),
      inject: [ConfigService],
    }),*/

    /* ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'tamper-scripts'),
    }),*/
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
