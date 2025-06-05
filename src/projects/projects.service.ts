import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
  }

  async findAll() {
    return await this.projectsRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<UpdateResult> {
    const result = await this.projectsRepository.update(id, updateProjectDto);

    // 업데이트된 행이 없으면 (해당 id의 프로젝트가 없으면) 예외 처리
    if (result.affected === 0) {
      throw new NotFoundException(
        `Project with ID "${id}" not found or no changes applied`,
      );
    }

    return result; // UpdateResult 객체 반환
  }

  async remove(id: number): Promise<void> {
    // 삭제는 보통 Promise<void> 또는 DeleteResult 반환
    const deleteResult = await this.projectsRepository.delete(id); // id를 기준으로 삭제

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    // 삭제 성공 시에는 특별히 반환할 값이 없을 수 있으니 void나 DeleteResult를 반환
  }

  // --- 새로 추가될 좋아요 수 증가 메서드 ---
  async updateProjectLikes(id: number): Promise<Project> {
    const projectToUpdate = await this.projectsRepository.findOne({
      where: { id },
    });

    if (!projectToUpdate) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    projectToUpdate.likes = projectToUpdate.likes + 1;

    const updatedProject = await this.projectsRepository.save(projectToUpdate);

    return updatedProject;
  }
}
