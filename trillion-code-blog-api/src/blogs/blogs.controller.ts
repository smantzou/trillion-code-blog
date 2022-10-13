import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Inject,
  Query,
  ParseBoolPipe,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import {
  ResponseBlogDto,
  ResponseRelatedBlogDto,
} from './dto/response-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@ApiTags('Blog')
@Controller('blog')
export class BlogsController {
  constructor(
    private readonly blogService: BlogsService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Success',
    type: CreateBlogDto,
  })
  async create(@Body() createBlogDto: CreateBlogDto) {
    this.logger.info(`[BLOG POST] Params ${JSON.stringify(createBlogDto)}`);
    const result = await this.blogService.create(createBlogDto);
    if (!result) throw new BadRequestException('Related Blog Ids Invalid!');
    this.logger.info(`[BLOG POST] Success`);
    return result;
  }

  @Get()
  @ApiOkResponse({
    description: 'Success',
    type: [ResponseBlogDto],
  })
  async findAll(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    this.logger.info(`[BLOG GET/?limit=${limit}&page=${page}] Params`);
    this.validatePaginationParamsOrThrow(page, limit);
    const result = await this.blogService.findAll(limit, page);
    this.logger.info(`[BLOG GET] Success`);
    return result;
  }

  private validatePaginationParamsOrThrow(page: number, limit: number) {
    if (page < 1 || limit < 1) {
      throw new BadRequestException(
        `Query Parameters limit and page must be greater than one received limit: ${JSON.stringify(
          limit,
        )} page: ${JSON.stringify(page)} `,
      );
    }
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Success',
    type: ResponseRelatedBlogDto,
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('includeRelatedBlogs', ParseBoolPipe) includeRelatedBlogs: boolean,
    @Query('includeContent', ParseBoolPipe) includeContent: boolean,
  ) {
    this.logger.info(
      `[BLOG GET/${id}?includeRelatedBlogs=${JSON.stringify(
        includeRelatedBlogs,
      )}&includeContent=${JSON.stringify(includeContent)}] `,
    );
    const result = await this.blogService.findOne(
      id,
      includeRelatedBlogs,
      includeContent,
    );
    if (!result) {
      throw new NotFoundException();
    }
    this.logger.info(
      `[BLOG GET/${id}?includeRelatedBlogs=${JSON.stringify(
        includeRelatedBlogs,
      )}&includeContent=${JSON.stringify(includeContent)}] Success`,
    );
    return result;
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Success',
    type: CreateBlogDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    this.logger.info(
      `[BLOG PATCH/${id}]  Params ${JSON.stringify(updateBlogDto)}`,
    );
    const result = await this.blogService.update(id, updateBlogDto);
    this.logger.info(`[BLOG PATCH/${id}] Success`);
    return result;
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Success',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    this.logger.info(`[BLOG DELETE/${id}]`);
    const result = await this.blogService.remove(id);
    this.logger.info(`[BLOG DELETE/${id}] Success`);
    return result;
  }
}
