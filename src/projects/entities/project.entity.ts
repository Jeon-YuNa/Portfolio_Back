import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  @IsNotEmpty()
  title: string;

  @Column('simple-array')
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  skills: string[];

  @Column('simple-array')
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  desc: string[];

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  siteURL: string;

  @Column({ type: 'int' })
  @IsInt()
  @IsNotEmpty()
  likes: number;
}
