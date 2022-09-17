import { Authorized, RestGuard, UserRole } from '@core/auth';
import { PagingDto } from '@models/dtos';
import { Event } from '@models/event.model';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateEventDto, FindAllEventDto, UpdateEventDto } from './event.dto';
import { EventService } from './event.service';

@UseGuards(RestGuard)
@ApiBearerAuth()
@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly service: EventService) {}

  @Authorized(UserRole.AUTHENTICATED)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Event, isArray: true })
  @Get('/')
  async findAll(@Query() options: FindAllEventDto) {
    return this.service.findAll(options);
  }

  @Authorized(UserRole.AUTHENTICATED)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Event })
  @Get('/:id')
  async finById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Authorized(UserRole.AUTHENTICATED)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Event })
  @Post('/')
  async create(@Body() body: CreateEventDto) {
    return this.service.create(body);
  }

  @Authorized(UserRole.AUTHENTICATED)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Event })
  @Put('/')
  async default(@Body() body: UpdateEventDto) {
    return this.service.update(body);
  }

  @Authorized(UserRole.AUTHENTICATED)
  @ApiBearerAuth()
  @ApiOkResponse({ type: Event })
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.service.deleteById(id);
  }
}
