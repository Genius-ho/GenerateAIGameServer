import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 💡 에러 해결의 핵심: 몽고DB 메인 서버와 연결하는 파이프라인 설치
    // (docker-compose.yml에 적어둔 주소를 자동으로 끌어와서 연결합니다.)
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://mongodb:27017/genai'),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}