import { Injectable } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { Visitor } from './entities/visitor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectRepository(Visitor)
    private visitorsRepository: Repository<Visitor>,
  ) {}

  async create(createVisitorDto: CreateVisitorDto) {
    const newVisitor = this.visitorsRepository.create({
      id: uuidv4(), // UUID 생성
      ...createVisitorDto,
    });

    const savedVisitor = await this.visitorsRepository.save(newVisitor);
    return savedVisitor; // 저장된 visitor 객체 리턴
  }

  async findAll(): Promise<Visitor[]> {
    return await this.visitorsRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} visitor`;
  }

  async update(id: string, updateVisitorDto: UpdateVisitorDto) {
    await this.visitorsRepository.update(id, updateVisitorDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.visitorsRepository.delete(id);
    if (result.affected === 0) {
      return { message: '방명록을 찾을 수 없습니다.' };
    }
    return { message: '방명록이 삭제되었습니다.' };
  }
}
