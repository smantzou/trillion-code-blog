import { IsInt } from 'class-validator';

export class CreateBlogOnBlogDto {
  @IsInt()
  blogId: number;
  @IsInt()
  relatedToBlogId: number;
}
