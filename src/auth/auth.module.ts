import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    // 토큰 발급 기계 세팅: 비밀 도장은 'secretKey', 수명은 '60분'
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60m' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // 보안 요원(JwtStrategy) 정식 등록
})
export class AuthModule {}
