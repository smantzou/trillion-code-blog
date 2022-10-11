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
    const areRelatedBlogIdsValid = await this.validateRelatedBlogIds(
      relatedBlogs,
    );
    if (!areRelatedBlogIdsValid) return null;
    const blogCreationResult = await this.blogsModel.create({
      data: blogDto,
    });
    await this.createBlogOnBlogRelation(relatedBlogs, blogCreationResult);
    return { ...blogCreationResult, relatedBlogs };
  }

  private async validateRelatedBlogIds(
    relatedBlogs: number[],
  ): Promise<boolean> {
    const blogs = await this.blogsModel.findMany({
      where: { id: { in: relatedBlogs } },
    });
    if (blogs.length !== relatedBlogs.length) {
      return false;
    }
    return true;
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
    if (!includeRelatedBlogs || !result) {
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
    const relatedBlogIds = this.getRelatedBlogIds(updateBlogDto);
    const updateResult = await this.blogsModel.update({
      where: { id: id },
      data: updateBlogDto,
    });
    if (!this.areTransactionsRequired(relatedBlogIds)) return updateResult;
    const { idsToRemove, idsToAdd } = await this.getTransanctionArray(
      updateResult,
      relatedBlogIds,
    );
    console.log(idsToRemove, idsToAdd);
    await this.runRequiredTransanctions(idsToRemove, id, idsToAdd);
    return updateResult;
  }

  private getRelatedBlogIds(updateBlogDto: UpdateBlogDto) {
    const relatedBlogIds = updateBlogDto.relatedBlogs;
    delete updateBlogDto['relatedBlogs'];
    return relatedBlogIds;
  }

  private async getTransanctionArray(
    updateResult: Blog,
    newRelatedBlogsIds: number[],
  ) {
    const previousRelatedBlogsIds = await this.retrieveCalculationParams(
      updateResult,
    );
    const {
      idsToRemove,
      idsToAdd,
    }: { idsToRemove: number[]; idsToAdd: number[] } =
      this.createTransactionArrays(previousRelatedBlogsIds, newRelatedBlogsIds);
    return { idsToRemove, idsToAdd };
  }

  private areTransactionsRequired(relatedBlogIds: number[]) {
    return relatedBlogIds !== null || relatedBlogIds.length < 0;
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

  private async retrieveCalculationParams(updateResult: Blog) {
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
    return previousRelatedBlogsIds;
  }

  async remove(id: number) {
    await this.blogsModel.delete({ where: { id: id } });
    return id;
  }
}
