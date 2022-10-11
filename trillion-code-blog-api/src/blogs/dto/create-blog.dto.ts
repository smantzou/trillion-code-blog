import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateBlogDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slug: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  imagePath: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
  @ApiProperty({
    type: Date,
  })
  @IsDateString()
  date: Date;
  @ApiProperty()
  @IsArray()
  @IsNumber({}, { each: true })
  @IsInt({ each: true })
  relatedBlogs: number[];
}
