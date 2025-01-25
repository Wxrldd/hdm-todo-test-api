import { Injectable } from '@nestjs/common';
import ServiceFactory from '../ServiceFactory';
import DeleteTask from './DeleteTask/DeleteTask';
import GetAllTasksUseCase from './GetAllTasks/GetAllTasksUseCase';
import CreateTask from './CreateTask/CreateTask';
import UpdateTask from './UpdateTask/UpdateTask';
import DeleteAllTasks from './DeleteAllTasks/DeleteAllTasks';

type UseCases = GetAllTasksUseCase | DeleteTask | DeleteAllTasks | CreateTask | UpdateTask;

@Injectable()
export default class UseCaseFactory extends ServiceFactory<UseCases> { }
