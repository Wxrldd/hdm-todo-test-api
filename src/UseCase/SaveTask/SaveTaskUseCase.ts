import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';
import SaveTaskDto from './SaveTaskDto';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    try {
      if (!dto.name || dto.name.trim() === '') {
        throw new BadRequestException('Task name is required');
      }
      let task: Task;

      if (dto.id) {
        const existingTask = await this.taskRepository.findAll();
        const taskToUpdate = existingTask.find((task) => task.id === dto.id);

        if (!taskToUpdate) {
          throw new BadRequestException('Task not found');
        }

        task = await this.taskRepository.save({
          ...dto,
          id: dto.id,
        });
      } else {
        task = await this.taskRepository.save({
          name: dto.name,
        });
      }

      return task;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
