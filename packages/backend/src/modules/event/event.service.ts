import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from '@models/event.model';
import { CreateEventDto, EventSorting, FindAllEventDto, UpdateEventDto } from './event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private readonly eventModel: Model<EventDocument>) {}
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return createdEvent.save();
  }

  async findAll({ skip, limit, eventSorting, ...event }: FindAllEventDto): Promise<Event[]> {
    let sort: EventSorting;
    if (eventSorting) {
      sort = JSON.parse(eventSorting) as EventSorting;
    }
    return this.eventModel
      .find({ ...event })
      .skip(skip)
      .limit(limit)
      .sort({ ...sort })
      .exec()
      .catch(() => {
        throw new BadRequestException('Id is not exist');
      });
  }

  async findById(id: string): Promise<Event | undefined> {
    if (!id) {
      throw new BadRequestException('Id must be a string');
    }
    return this.eventModel
      .findById(id)
      .exec()
      .catch(() => {
        throw new BadRequestException('Id is not exist');
      });
  }

  async update(upsertEventDto: UpdateEventDto): Promise<Event> {
    const updatedEvent = await this.eventModel
      .findOneAndUpdate({ _id: upsertEventDto.id }, { ...upsertEventDto })
      .exec();
    return updatedEvent;
  }

  async deleteById(id: string): Promise<void> {
    await this.findById(id);
    await this.eventModel.deleteOne({ _id: id });
  }
}
