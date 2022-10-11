import { Injectable } from '@nestjs/common';
import { Blog } from '@prisma/client';
import { PrismaService } from 'src/shared/modules/prisma/prisma.service';
import { CreateBlogOnBlogDto } from './dto/create-blog-on-blog.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  private readonly blogsModel = this.prisma.blog;
  private readonly blogsOnBlogsModel = this.prisma.blogsOnBlogs;

  constructor(private readonly prisma: PrismaService) {}

  async create(createBlogDto: CreateBlogDto) {
    const { blogDto, relatedBlogs } = this.extractDtos(createBlogDto);
    const blogCreationResult = await this.blogsModel.create({
      data: blogDto,
    });
    await this.createBlogOnBlogRelation(relatedBlogs, blogCreationResult);
    return { ...blogCreationResult, relatedBlogs };
  }

  private async createBlogOnBlogRelation(
    relatedBlogs: number[],
    blogCreationResult: Blog,
  ) {
    const createBlogOnBlogDto: CreateBlogOnBlogDto[] = relatedBlogs.map(
      (relatedBlog): CreateBlogOnBlogDto => {
        return { blogId: blogCreationResult.id, relatedToBlogId: relatedBlog };
      },
    );
    const blogOnBlogCreationResult = await this.blogsOnBlogsModel.createMany({
      data: createBlogOnBlogDto,
    });
    return blogOnBlogCreationResult;
  }

  private extractDtos(createBlogDto: CreateBlogDto) {
    const relatedBlogs = createBlogDto.relatedBlogs;
    delete createBlogDto['relatedBlogs'];
    const blogDto = createBlogDto;
    return { blogDto, relatedBlogs };
  }

  async findAll() {
    const result = await this.blogsModel.findMany({
      select: {
        name: true,
        slug: true,
        imagePath: true,
        date: true,
      },
    });
    return result;
  }

  async findOne(
    id: number,
    includeRelatedBlogs: boolean,
    includeContent: boolean,
  ) {
    const result = await this.blogsModel.findUnique({
      where: { id: id },
      select: {
        name: true,
        slug: true,
        imagePath: true,
        date: true,
        content: includeContent,
      },
    });
    if (!includeRelatedBlogs) {
      return result;
    }
    return await this.getFormattedBlog(id, result);
  }

  private async getFormattedBlog(
    id: number,
    result: {
      name: string;
      slug: string;
      imagePath: string;
      content: string;
      date: Date;
    },
  ) {
    const relatedResult = await this.blogsOnBlogsModel.findMany({
      where: {
        blogId: id,
      },
      select: {
        relatedToBlog: {
          select: {
            name: true,
            slug: true,
            imagePath: true,
            date: true,
          },
        },
      },
    });
    const relatedBlogs = relatedResult.map((related) => related.relatedToBlog);
    return { ...result, relatedBlogs: relatedBlogs };
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const updateResult = await this.blogsModel.update({
      where: { id: id },
      data: updateBlogDto,
    });
    if (this.areTransactionsRequired(updateBlogDto)) return updateResult;
    const { idsToRemove, idsToAdd } = await this.getTransanctionArray(
      updateBlogDto,
      updateResult,
    );
    await this.runRequiredTransanctions(idsToRemove, id, idsToAdd);
  }

  private async getTransanctionArray(
    updateBlogDto: UpdateBlogDto,
    updateResult: Blog,
  ) {
    const { previousRelatedBlogsIds, newRelatedBlogsIds } =
      await this.retrieveCalculationParams(updateBlogDto, updateResult);
    const {
      idsToRemove,
      idsToAdd,
    }: { idsToRemove: number[]; idsToAdd: number[] } =
      this.createTransactionArrays(previousRelatedBlogsIds, newRelatedBlogsIds);
    return { idsToRemove, idsToAdd };
  }

  private areTransactionsRequired(updateBlogDto: UpdateBlogDto) {
    return updateBlogDto.relatedBlogs || updateBlogDto.relatedBlogs.length < 0;
  }

  private async runRequiredTransanctions(
    idsToRemove: number[],
    id: number,
    idsToAdd: number[],
  ) {
    if (idsToRemove.length > 0) {
      await this.blogsOnBlogsModel.deleteMany({
        where: {
          blogId: id,
          relatedToBlogId: { in: idsToRemove },
        },
      });
    }

    if (idsToAdd.length > 0) {
      const createBlogOnBlogDto: CreateBlogOnBlogDto[] = idsToAdd.map(
        (idToAdd): CreateBlogOnBlogDto => {
          return { blogId: id, relatedToBlogId: idToAdd };
        },
      );
      await this.blogsOnBlogsModel.createMany({
        data: createBlogOnBlogDto,
      });
    }
  }

  private createTransactionArrays(
    previousRelatedBlogsIds: number[],
    newRelatedBlogsIds: number[],
  ) {
    const idsToRemove: number[] = previousRelatedBlogsIds.filter(
      (id) => !newRelatedBlogsIds.includes(id),
    );
    const idsToAdd: number[] = newRelatedBlogsIds.filter((id) => {
      return previousRelatedBlogsIds.indexOf(id) < 0;
    });
    return { idsToRemove, idsToAdd };
  }

  private async retrieveCalculationParams(
    updateBlogDto: UpdateBlogDto,
    updateResult: Blog,
  ) {
    const newRelatedBlogsIds = updateBlogDto.relatedBlogs;
    const previousRelatedBlogs = await this.blogsOnBlogsModel.findMany({
      where: {
        blogId: updateResult.id,
      },
      select: {
        relatedToBlogId: true,
      },
    });
    const previousRelatedBlogsIds = previousRelatedBlogs.map(
      (previousRelatedBlog) => previousRelatedBlog.relatedToBlogId,
    );
    return { previousRelatedBlogsIds, newRelatedBlogsIds };
  }

  async remove(id: number) {
    await this.blogsModel.delete({ where: { id: id } });
    return id;
  }
}
