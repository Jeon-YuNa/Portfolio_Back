import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodayVisitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column({ type: 'timestamp' })
  today: Date;
}
