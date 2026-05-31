import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CharacterDocument = Character & Document;

@Schema({ timestamps: true }) // 생성, 수정 시간 자동 기록
export class Character {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  accountId: Types.ObjectId; // 💡 계정 연동 (누구의 캐릭터인가?)

  @Prop({ required: true, unique: true })
  name: string; // 캐릭터 이름

  @Prop({ default: 0 })
  race: number; // 0=자녀, 1=부모

  @Prop({ default: 0 })
  money: number; // 보유 금액 (원)

  @Prop({ default: 10 })
  hp: number; // 체력 (초기값 10)

  @Prop({ default: 10 })
  int: number; // 지능 (초기값 10)

  @Prop({ default: 0 })
  health: number; // 상태 (0=정상, 1=감기/휴식, 2=입원)

  @Prop({ default: '유치원생' })
  level: string; // 학년 레벨 (유치원생, 초등1~6, 중등1~3, 고등1~3, 성인)

  // 💡 인벤토리 (아이템 보유 수량)
  @Prop({
    type: Object,
    default: {
      item1_school1: 0,      // 학용품1
      item2_school2: 0,      // 학용품2
      item3_sports1: 0,      // 운동용품1
      item4_sports2: 0,      // 운동용품2
      item5_med_hp: 0,       // 의학용품1 (HP 회복)
      item6_med_int: 0,       // 의학용품2 (INT 증가)
      item7_glass: 0,        // 돋보기 (문제 답 보기)
      special1_mom: 0,       // 특수아이템1: 엄마가 대신 풀어주기
      special2_gift: 0,      // 특수아이템2: 생일선물 (MONEY 증가)
    },
  })
  inventory: Record<string, number>;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);