import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') // http://localhost:3000/users 주소 담당
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 💡 손님이 POST 방식으로 데이터를 쏴주면 이 함수가 실행됩니다.
  @Post() 
  async register(@Body() createUserDto: CreateUserDto) {
    // 점원이 받은 가입 신청서(Dto)를 발권 매니저(Service)에게 그대로 넘겨줍니다.
    return this.usersService.register(createUserDto);
  }
}