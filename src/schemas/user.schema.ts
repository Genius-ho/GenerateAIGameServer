import { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

// 1. 유저 데이터의 타입(형태) 정의
export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

// 2. 몽고DB에 저장될 실제 스키마(설계도) 생성
export const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
}, {
  timestamps: true, // 데이터가 생성/수정된 시간을 자동으로 기록
});

// 3. 비밀번호 자동 암호화(해싱) 미들웨어 (최신 Mongoose 문법 적용)
UserSchema.pre('save', async function (this: any) {
  // 비밀번호가 변경되지 않았다면 그냥 통과 (next 불필요)
  if (!this.isModified('password')) return;
  
  // 비밀번호 암호화 진행 (try-catch, next 모두 불필요)
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
});

// 4. 로그인 시 비밀번호가 맞는지 비교해주는 함수
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};