import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import CreateTask from '../UseCase/CreateTask/CreateTask';
import UpdateTask from '../UseCase/UpdateTask/UpdateTask';

@Controller()
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory) { }

  @Get('/tasks')
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  @Post('/tasks')
  async create(@Body() dto: SaveTaskDto) {
    return (await this.useCaseFactory.create(CreateTask)).handle(dto);
  }

  @Patch('/tasks/:id')
  async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
    dto.id = Number(id);
    return (await this.useCaseFactory.create(UpdateTask)).handle(dto);
  }

  @Delete('/tasks/:id')
  async delete(@Param('id') id: string) {
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }
}
