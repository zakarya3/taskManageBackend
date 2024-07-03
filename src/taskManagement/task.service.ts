import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/createtask.dto';
import { UpdateTaskDto } from './dto/updatetask.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly userService: UsersService,
  ) {}

  async findAll(): Promise<TaskEntity[]> {
    return await this.taskRepository.find();
  }

  findOne(id: number): Promise<TaskEntity> {
    return this.taskRepository.findOneBy({ id });
  }

  async create(taskDto: CreateTaskDto, userId: number): Promise<TaskEntity> {
    const user = await this.userService.findOneById(userId);
    const createdTask = this.taskRepository.create({ ...taskDto, user });
    return await this.taskRepository.save(createdTask);
  }

  async update(id: number, taskDto: UpdateTaskDto): Promise<TaskEntity> {
    await this.taskRepository.update(id, taskDto);
    return await this.taskRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.taskRepository.delete(id);
    return { message: 'task deleted !' };
  }
}
