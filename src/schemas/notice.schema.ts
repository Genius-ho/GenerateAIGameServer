import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoticeDocument = Notice & Document;

@Schema({ timestamps: true }) // 💡 자동으로 작성일(createdAt), 수정일(updatedAt)이 기록됩니다.
export class Notice {
  @Prop({ required: true })
  title: string; // 공지사항 제목

  @Prop({ required: true })
  content: string; // 공지사항 상세 내용

  @Prop({ default: '일반' }) 
  category: string; // 카테고리 (예: 점검, 이벤트, 업데이트, 일반)

  @Prop({ default: false })
  isPinned: boolean; // 상단 고정 여부 (중요 공지는 맨 위에 올리기 위함)
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);