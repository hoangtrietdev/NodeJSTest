import { PagingDto } from '@models/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsJSON, IsNumber, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'mongoose';

export type EventSorting = {
  [key: string]:
    | SortOrder
    | {
        $meta: 'textScore';
      };
};

export class FindAllEventDto extends PagingDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  _id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  description?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ type: Date, required: false })
  startDate?: Date;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ type: Date, required: false })
  dueDate?: Date;

  @IsOptional()
  @IsJSON()
  @ApiProperty({ type: String, required: false })
  eventSorting?: string;
}

export class CreateEventDto {
  @IsString()
  @ApiProperty({ type: String, required: true })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  description: string;

  @IsDateString()
  @ApiProperty({ type: Date, required: true })
  startDate: Date;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ type: Date })
  dueDate: Date;
}

export class UpdateEventDto {
  @IsString()
  @ApiProperty({ type: String, required: true })
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  description: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ type: Date })
  startDate: Date;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ type: Date })
  dueDate: Date;
}
