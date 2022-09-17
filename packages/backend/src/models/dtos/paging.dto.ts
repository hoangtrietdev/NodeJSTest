import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PagingDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ type: Number, default: 0 })
  skip?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ type: Number, default: 20 })
  limit?: number;
}
