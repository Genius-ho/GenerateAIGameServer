import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from '../schemas/character.schema';
import { CreateCharacterDto } from './dto/create-character.dto';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
  ) {}

  // 💡 캐릭터 생성 함수
  async createCharacter(createCharacterDto: CreateCharacterDto, accountId: string) {
    // 1. 이름 중복 검사 (같은 이름이 있는지 DB 확인)
    const existingCharacter = await this.characterModel.findOne({ name: createCharacterDto.name });
    if (existingCharacter) {
      throw new ConflictException('이미 존재하는 캐릭터 이름입니다.');
    }

    // 2. 캐릭터 생성 및 저장
    const newCharacter = new this.characterModel({
      ...createCharacterDto,
      accountId, // 이 캐릭터의 주인 ID
    });

    return await newCharacter.save();
  }
}