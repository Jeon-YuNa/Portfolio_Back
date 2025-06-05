import { Module } from '@nestjs/common';
import { TodayVisitorsService } from './today-visitors.service';
import { TodayVisitorsController } from './today-visitors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodayVisitor } from './entities/today-visitor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodayVisitor])],
  controllers: [TodayVisitorsController],
  providers: [TodayVisitorsService],
})
export class TodayVisitorsModule {}
