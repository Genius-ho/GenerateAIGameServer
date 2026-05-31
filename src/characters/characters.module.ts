import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { Character, CharacterSchema } from '../schemas/character.schema';

@Module({
  imports: [
    // 💡 몽고DB에 캐릭터 설계도(Schema)를 공식 등록합니다.
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }]),
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}