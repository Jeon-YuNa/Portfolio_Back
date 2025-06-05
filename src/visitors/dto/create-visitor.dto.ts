import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateVisitorDto {
  @IsString()
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  @MaxLength(20, { message: '닉네임은 20글자 이하로 작성해주세요.' })
  nickname: string;

  @IsString()
  @IsNotEmpty({ message: '내용을 입력해주세요.' })
  @MaxLength(500, { message: '내용은 500글자 이하로 작성해주세요.' })
  content: string;
}
