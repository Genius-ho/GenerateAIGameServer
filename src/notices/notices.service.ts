import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notice, NoticeDocument } from '../schemas/notice.schema';
import { CreateNoticeDto } from './dto/create-notice.dto';

@Injectable()
export class NoticesService {
  constructor(
    @InjectModel(Notice.name) private noticeModel: Model<NoticeDocument>,
  ) {}

  // 1. 새로운 공지사항 등록 로직
  async create(createNoticeDto: CreateNoticeDto): Promise<Notice> {
    const newNotice = new this.noticeModel(createNoticeDto);
    return await newNotice.save();
  }

  // 2. 전체 공지사항 목록 조회 로직 (최신순 및 상단 고정 우선 정렬)
  async findAll(): Promise<Notice[]> {
    return await this.noticeModel
      .find()
      .sort({ isPinned: -1, createdAt: -1 }) // 💡 중요 공지(isPinned)를 맨 위로, 그 다음 최신순 정렬
      .exec();
  }
}