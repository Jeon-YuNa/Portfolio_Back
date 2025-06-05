import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateTodayVisitorDto {
  @IsString()
  ip: string;
}
