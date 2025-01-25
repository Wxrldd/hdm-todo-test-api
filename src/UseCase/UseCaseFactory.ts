import { Injectable } from '@nestjs/common';
import ServiceFactory from '../ServiceFactory';
import DeleteTask from './DeleteTask/DeleteTask';
import GetAllTasksUseCase from './GetAllTasks/GetAllTasksUseCase';
import CreateTask from './CreateTasks/CreateTask';

type UseCases = GetAllTasksUseCase | DeleteTask | CreateTask;

@Injectable()
export default class UseCaseFactory extends ServiceFactory<UseCases> { }
