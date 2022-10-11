import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/modules/prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  private readonly blogsModel = this.prisma.blog;
  private readonly blogsOnBlogs = this.prisma.blogsOnBlogs;

  constructor(private readonly prisma: PrismaService) {}

  async create(createBlogDto: CreateBlogDto) {
    const blogRelations = createBlogDto.relatedBlogs;
    delete createBlogDto['relatedBlogs'];
    const blogDto = createBlogDto;
  }

  async findAll(includeRelatedBlogs, includeContent) {
    const blogs = await this.blogsModel.findMany();
    const blogsOnBlogs = await this.blogsOnBlogs.findMany();
    return { blogs, blogsOnBlogs };
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
