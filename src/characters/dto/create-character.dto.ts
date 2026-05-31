import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty({ message: '캐릭터 이름을 입력해주세요.' })
  name: string; // 유저가 입력할 캐릭터 이름

  @IsNumber()
  @Min(0)
  @Max(1)
  @IsNotEmpty({ message: '종족을 선택해주세요. (0: 자녀, 1: 부모)' })
  race: number; // 유저가 선택할 종족 (0 또는 1만 가능하도록 철저히 검증)
}