import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty({ message: '타이틀을 입력해주세요.' })
  title: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: '스킬을 하나 이상 입력해주세요.' })
  skills: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: '설명을 입력해주세요.' })
  desc: string[];

  @IsString()
  @IsNotEmpty({ message: '사이트 주소를 입력해주세요.' })
  siteURL: string;

  @IsNumber()
  @IsNotEmpty()
  likes: number;
}
