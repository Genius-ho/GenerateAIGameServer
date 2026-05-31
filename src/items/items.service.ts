import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from '../schemas/character.schema';
import { ItemActionDto } from './dto/item-action.dto';

// 💡 기획하신 25종 아이템 마스터 카탈로그
const ITEM_CATALOG = {
  // [학용품] 지능(INT) 영구 상승
  school_pencil: { name: '연필', price: 500, intUp: 1 },
  school_eraser: { name: '지우개', price: 700, intUp: 2 },
  school_notebook: { name: '공책', price: 1000, intUp: 3 },
  school_ruler: { name: '자', price: 1200, intUp: 4 },
  school_colorpencil: { name: '색연필', price: 2000, intUp: 5 },
  school_pencilcase: { name: '필통', price: 3500, intUp: 8 },
  school_fountainpen: { name: '만년필', price: 15000, intUp: 15 },
  school_calculator: { name: '공학용 계산기', price: 30000, intUp: 25 },
  school_note: { name: '오답 노트', price: 50000, intUp: 45 },
  school_workbook: { name: '전과/참고서', price: 80000, intUp: 70 },

  // [운동용품] 체력(HP) 영구 상승
  sports_jumprope: { name: '줄넘기', price: 3000, hpUp: 5 },
  sports_gripper: { name: '악력기', price: 5000, hpUp: 10 },
  sports_badminton: { name: '배드민턴 라켓', price: 15000, hpUp: 20 },
  sports_soccerball: { name: '축구공', price: 25000, hpUp: 35 },
  sports_bicycle: { name: '자전거', price: 120000, hpUp: 60 },

  // [의학용품 - HP 회복] 현재 체력 회복
  med_vitamin: { name: '비타민', price: 1000, heal: 5 },
  med_bandaid: { name: '대역 밴드', price: 1500, heal: 10 },
  med_ointment: { name: '연고', price: 3500, heal: 20 },
  med_coldpill: { name: '감기약', price: 5000, heal: 40 },
  med_ringer: { name: '링거 영양제', price: 50000, heal: 100 },

  // [의학용품 - INT 증가] 지능(INT) 영구 상승
  med_glucose: { name: '포도당 캔디', price: 2000, intUp: 5 },
  med_omega3: { name: 'DHA 오메가3', price: 15000, intUp: 12 },
  med_ginseng: { name: '홍삼 진액', price: 45000, intUp: 25 },
  med_herbal: { name: '총명탕', price: 150000, intUp: 55 },
  med_tonic: { name: '수험생 보약', price: 300000, intUp: 100 },
};

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
  ) {}

  // 🛒 아이템 구매 로직
  async buyItem(itemActionDto: ItemActionDto) {
    const { characterId, itemId } = itemActionDto;
    const itemInfo = ITEM_CATALOG[itemId];

    if (!itemInfo) throw new BadRequestException('존재하지 않는 아이템입니다.');

    const character = await this.characterModel.findById(characterId);
    if (!character) throw new NotFoundException('캐릭터를 찾을 수 없습니다.');

    if (character.money < itemInfo.price) {
      throw new BadRequestException(`돈이 부족합니다. (필요 금액: ${itemInfo.price}원)`);
    }

    // 돈 차감 후 가방(inventory) 객체에 아이템 수량 +1
    character.money -= itemInfo.price;
    character.inventory[itemId] = (character.inventory[itemId] || 0) + 1;

    // 💡 몽구스 특성상 Object 타입 내부의 변화를 알려야 DB에 반영됩니다.
    character.markModified('inventory');
    return await character.save();
  }

  // 🧪 아이템 사용 로직
  async useItem(itemActionDto: ItemActionDto) {
    const { characterId, itemId } = itemActionDto;
    const itemInfo = ITEM_CATALOG[itemId];

    if (!itemInfo) throw new BadRequestException('존재하지 않는 아이템입니다.');

    const character = await this.characterModel.findById(characterId);
    if (!character) throw new NotFoundException('캐릭터를 찾을 수 없습니다.');

    if (!character.inventory[itemId] || character.inventory[itemId] <= 0) {
      throw new BadRequestException(`가방에 [${itemInfo.name}] 아이템이 없습니다.`);
    }

    // 아이템 1개 소모
    character.inventory[itemId] -= 1;

    // 데이터 기반 자동 스탯 반영
    if (itemInfo.intUp) {
      character.int += itemInfo.intUp;
      this.updateLevelByInt(character); // 지능 상승에 따른 학년 레벨 실시간 동기화
    }
    if (itemInfo.hpUp) {
      character.hp += itemInfo.hpUp;
    }
    if (itemInfo.heal) {
      character.hp += itemInfo.heal;
    }

    character.markModified('inventory');
    return await character.save();
  }

  // 🎓 지능(INT) 기준 학년 레벨 자동 계산기
  private updateLevelByInt(character: CharacterDocument) {
    const currentInt = character.int;
    if (currentInt >= 30000) character.level = '성인';
    else if (currentInt >= 20000) character.level = '고등 3학년';
    else if (currentInt >= 15000) character.level = '고등 2학년';
    else if (currentInt >= 10000) character.level = '고등 1학년';
    else if (currentInt >= 7000) character.level = '중등 3학년';
    else if (currentInt >= 4000) character.level = '중등 2학년';
    else if (currentInt >= 2000) character.level = '중등 1학년';
    else if (currentInt >= 1500) character.level = '초등 6학년';
    else if (currentInt >= 1000) character.level = '초등 5학년';
    else if (currentInt >= 500) character.level = '초등 4학년';
    else if (currentInt >= 300) character.level = '초등 3학년';
    else if (currentInt >= 200) character.level = '초등 2학년';
    else if (currentInt >= 100) character.level = '초등 1학년';
    else character.level = '유치원생';
  }
}
