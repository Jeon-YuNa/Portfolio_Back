import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { TodayVisitorsService } from './today-visitors.service';
import { TodayVisitor } from './entities/today-visitor.entity';

@Controller('today-visitors')
export class TodayVisitorsController {
  constructor(private readonly todayVisitorsService: TodayVisitorsService) {}

  @Post('today')
  @HttpCode(HttpStatus.CREATED)
  createTodayVisitor(@Req() req: Request): Promise<TodayVisitor | null> {
    let ip =
      req.headers['x-forwarded-for'] ||
      (req as any).socket?.remoteAddress ||
      (req as any).connection?.remoteAddress;
    if (Array.isArray(ip)) {
      ip = ip[0];
    }
    if (typeof ip === 'string' && ip.startsWith('::ffff:')) {
      ip = ip.replace('::ffff:', '');
    }

    return this.todayVisitorsService.createTodayVisitor(ip);
  }

  @Get('count')
  getTodayVisitorCount(): Promise<number> {
    return this.todayVisitorsService.getTodayVisitorCount();
  }
}
