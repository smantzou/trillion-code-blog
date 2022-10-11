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
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ResponseBlogsDto } from './dto/response-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
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
    this.logger.info(`[BLOG POST] Success`);
    return result;
  }

  @Get()
  @ApiOkResponse({
    description: 'Success',
    type: [ResponseBlogsDto],
  })
  async findAll(
    @Query('includeRelatedBlogs', ParseBoolPipe) includeRelatedBlogs: boolean,
    @Query('includeContent', ParseBoolPipe) includeContent: boolean,
  ) {
    this.logger.info(
      `[BLOG GET?includeRelatedBlogs=${JSON.stringify(
        includeRelatedBlogs,
      )}&includeContent=${JSON.stringify(includeContent)}] Params`,
    );
    const result = await this.blogService.findAll(
      includeRelatedBlogs,
      includeContent,
    );
    this.logger.info(`[BLOG GET] Success`);
    return result;
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Success',
    type: ResponseBlogsDto,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.info(`[BLOG GET/${id}]`);
    const result = await this.blogService.findOne(id);
    this.logger.info(`[BLOG GET/${id}] Success`);
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
