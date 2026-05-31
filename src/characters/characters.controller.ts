import { Controller, Post, Body } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  // 💡 포스트맨에서 POST /characters 로 요청이 오면 실행됨
  @Post()
  async createCharacter(@Body() createCharacterDto: CreateCharacterDto) {
    // 임시 테스트용 가짜 유저 ID (로그인 기능 연동 전까지 사용)
    const tempAccountId = '650000000000000000000000'; 
    
    return await this.charactersService.createCharacter(createCharacterDto, tempAccountId);
  }
}