import { PartialType } from '@nestjs/mapped-types';
import { CreateTodayVisitorDto } from './create-today-visitor.dto';

export class UpdateTodayVisitorDto extends PartialType(CreateTodayVisitorDto) {}
