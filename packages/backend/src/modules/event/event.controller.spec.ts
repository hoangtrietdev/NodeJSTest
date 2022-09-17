import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { EventService } from './event.service';
import { EventModule } from './event.module';

describe('Event', () => {
  let app: INestApplication;
  let eventService = { findAll: () => [] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EventModule],
    })
      .overrideProvider(EventService)
      .useValue(eventService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET event`, () => {
    return request(app.getHttpServer()).get('/event').expect(200).expect({
      data: eventService.findAll(),
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
