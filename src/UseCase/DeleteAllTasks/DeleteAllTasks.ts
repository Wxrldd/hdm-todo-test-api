import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class DeleteAllTasks implements UseCase<Promise<boolean>, []> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle() {
    try {
      await this.taskRepository.deleteAll();
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
