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

export class ResponseBlogDto {
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

export class ResponseRelatedBlogDto {
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
    type: [ResponseBlogDto],
  })
  @IsArray()
  @Transform((data) => plainToClass(ResponseBlogDto, data.obj.relatedBlogs), {
    toClassOnly: true,
  })
  @ValidateNested({ each: true })
  relatedBlogs: ResponseBlogDto[];
}
