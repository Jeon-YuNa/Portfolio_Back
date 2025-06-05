import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VisitorsModule } from './visitors/visitors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitor } from './visitors/entities/visitor.entity';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/entities/project.entity';
import { TodayVisitorsModule } from './today-visitors/today-visitors.module';
import { TodayVisitor } from './today-visitors/entities/today-visitor.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-db',
      port: 3306,
      username: 'root',
      password: '1234',
      database: '2025portfolio',
      entities: [Visitor, Project, TodayVisitor],
      synchronize: true,
    }),
    VisitorsModule,
    ProjectsModule,
    TodayVisitorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
