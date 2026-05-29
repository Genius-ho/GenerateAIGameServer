import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from '../schemas/user.schema'; // 앞서 만든 금고 설계도

@Module({
  imports: [
    // MongoDB의 'User' 컬렉션과 우리가 만든 스키마(설계도)를 정식으로 연결
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController], // 매표소 점원 등록
  providers: [UsersService],      // 발권 매니저 등록
  exports: [UsersService],        // Auth(인증) 부서 등 다른 곳에서도 이 매니저를 쓸 수 있게 개방
})
export class UsersModule {}