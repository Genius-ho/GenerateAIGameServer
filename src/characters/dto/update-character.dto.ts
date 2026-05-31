import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create-character.dto';

// 💡 PartialType을 사용하면 CreateCharacterDto의 모든 항목(이름, 종족 등)을
// '필수가 아닌 선택적(Optional) 항목'으로 싹 바꿔서 가져옵니다. (수정할 때 아주 유용함)
export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {
  // 나중에 레벨, HP, 돈 등을 수정할 때 필요한 추가 검증 로직이 있다면 여기에 적습니다.
}