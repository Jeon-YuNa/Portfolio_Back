import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodayVisitor } from './entities/today-visitor.entity';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class TodayVisitorsService {
  constructor(
    @InjectRepository(TodayVisitor)
    private visitorRepository: Repository<TodayVisitor>,
  ) {}

  async createTodayVisitor(ip: string): Promise<TodayVisitor | null> {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const existing = await this.visitorRepository.findOne({
      where: {
        ip,
        today: MoreThanOrEqual(todayStart),
      },
    });

    if (existing) {
      return null; // 이미 오늘 방문
    }

    // 새 방문자 저장
    const newVisitor = this.visitorRepository.create({
      ip,
      today: new Date(),
    });

    return await this.visitorRepository.save(newVisitor);
  }

  async getTodayVisitorCount(): Promise<number> {
    const startOfToday = moment().startOf('day').toDate();
    const endOfToday = moment().endOf('day').toDate();

    return this.visitorRepository.count({
      where: {
        today: Between(startOfToday, endOfToday),
      },
    });
  }
}
