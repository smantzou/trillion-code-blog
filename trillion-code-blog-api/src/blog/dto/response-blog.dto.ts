import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class ResponseRelatedBlogDto {
  @ApiProperty()
  @IsInt()
  id: number;
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
}

export class ResponseBlogsDto {
  @ApiProperty()
  @IsInt()
  id: number;
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
  @ApiProperty({
    type: [ResponseRelatedBlogDto],
  })
  @IsArray()
  @Transform(
    (data) => plainToClass(ResponseRelatedBlogDto, data.obj.relatedBlogs),
    {
      toClassOnly: true,
    },
  )
  @ValidateNested({ each: true })
  relatedBlogs: ResponseRelatedBlogDto[];
}
