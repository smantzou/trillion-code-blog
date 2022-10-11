import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

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
  @ApiProperty()
  @IsDate()
  date: Date;
  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  relatedBlogs: number[];
}
