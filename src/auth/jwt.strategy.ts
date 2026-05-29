import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 손님 머리(Header)에서 토큰 찾기
      ignoreExpiration: false, // 유효기간 지난 토큰은 무자비하게 거절하기
      secretOrKey: 'secretKey', // 토큰 위조 방지용 비밀 도장 (나중엔 숨겨야 함)
    });
  }

  // 토큰 검사를 무사히 통과하면 이 함수가 실행됩니다.
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email }; 
  }
}
