export class CreateNoticeDto {
  readonly title: string;
  readonly content: string;
  readonly category?: string; // 💡 ?는 필수값이 아님을 의미합니다 (선택 사항)
  readonly isPinned?: boolean;
}