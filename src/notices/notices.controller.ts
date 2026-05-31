import { Controller, Get, Post, Body } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { CreateNoticeDto } from './dto/create-notice.dto';

@Controller('notices') // 💡 http://localhost:3000/notices 주소로 매핑됩니다.
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  // 1. 공지사항 작성 API 창구 (POST /notices)
  @Post()
  async create(@Body() createNoticeDto: CreateNoticeDto) {
    return await this.noticesService.create(createNoticeDto);
  }

  // 2. 공지사항 전체 조회 API 창구 (GET /notices)
  @Get()
  async findAll() {
    return await this.noticesService.findAll();
  }
}