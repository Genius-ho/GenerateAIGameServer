import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoticesController } from './notices.controller';
import { NoticesService } from './notices.service';
import { Notice, NoticeSchema } from '../schemas/notice.schema';

@Module({
  imports: [
    // 💡 공지사항 부서에서 Notice DB에 접근할 수 있도록 허가합니다.
    MongooseModule.forFeature([{ name: Notice.name, schema: NoticeSchema }]),
  ],
  controllers: [NoticesController],
  providers: [NoticesService],
})
export class NoticesModule {}