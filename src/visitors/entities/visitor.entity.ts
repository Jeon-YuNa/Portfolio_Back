import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Visitor {
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  id: string;

  @Column({ type: 'varchar', length: 20 })
  nickname: string;

  @Column({ type: 'text' })
  content: string;
}
