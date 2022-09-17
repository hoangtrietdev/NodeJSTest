import { Event, EventSchema } from '@models/event.model';
import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
      },
    ]),
  ],
  providers: [EventService],
})
export class EventModule {
  static http(): DynamicModule {
    return {
      module: EventModule,
      controllers: [EventController],
    };
  }
}
