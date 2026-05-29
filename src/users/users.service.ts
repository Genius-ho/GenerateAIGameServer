import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema'; // 앞서 만든 금고 설계도 불러오기
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  // DB(금고)에 접근할 수 있는 권한(userModel)을 매니저에게 부여함
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // 회원 가입(생성) 핵심 로직
  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    
    // 1. 금고에 똑같은 이메일이 있는지 먼저 확인
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.'); // 에러 튕겨내기
    }
    
    // 2. 중복이 없으면 새로운 회원 정보로 포장해서 금고에 진짜 저장
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
}