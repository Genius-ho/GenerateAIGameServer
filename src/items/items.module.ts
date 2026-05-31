import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Character, CharacterSchema } from '../schemas/character.schema';

@Module({
  imports: [
    // 💡 아이템 부서에서도 캐릭터 DB 금고를 열 수 있도록 공식 허가합니다.
    MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}