import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';
import SaveTaskDto from '../SaveTask/SaveTaskDto';

@Injectable()
export default class CreateTask
  implements UseCase<Promise<Task>, [dto: SaveTaskDto]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    try {
      if (!dto.name || dto.name.trim() === '') {
        throw new BadRequestException('Task name cannot be empty.');
      }
      const task = await this.taskRepository.save({
        name: dto.name,
      });

      return task;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}