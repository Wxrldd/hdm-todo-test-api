import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';
import SaveTaskDto from '../SaveTask/SaveTaskDto';

@Injectable()
export default class UpdateTask implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    try {
      if (!dto.id) {
        throw new BadRequestException('ID is required for updating task');
      }

      const existingTask = await this.taskRepository.findAll();
      const taskToUpdate = existingTask.find((task) => task.id === dto.id);

      if (!taskToUpdate) {
        throw new BadRequestException('Task not found');
      }

      const updatedTask = await this.taskRepository.save({
        id: dto.id,
        name: dto.name,
      });

      return updatedTask;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
