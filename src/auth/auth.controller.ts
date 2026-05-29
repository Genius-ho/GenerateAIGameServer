import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // 여기에 /login, /register 주문을 받는 코드를 작성할 예정입니다.
}