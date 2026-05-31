import { IsString, IsNotEmpty } from 'class-validator';

export class ItemActionDto {
  @IsString()
  @IsNotEmpty({ message: '캐릭터 ID(_id)를 입력해주세요.' })
  characterId: string; // 대상 캐릭터의 DB 고유 ID

  @IsString()
  @IsNotEmpty({ message: '아이템 ID 코드를 입력해주세요.' })
  itemId: string; // 상점 카탈로그에 등록된 아이템 코드 (예: school_pencil)
}