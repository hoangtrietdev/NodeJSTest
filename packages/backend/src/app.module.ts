import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AuthModule from '@modules/auth';
import HealthModule from '@modules/health';
import LoggerModule, { RequestLoggingMiddleware } from '@modules/logger';
import systemConfig from '@core/config';
import EventModule from '@modules/event';

@Module({
  imports: [
    MongooseModule.forRoot(systemConfig.mongo.url),
    LoggerModule,
    HealthModule,
    AuthModule.http(),
    EventModule.http(),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
