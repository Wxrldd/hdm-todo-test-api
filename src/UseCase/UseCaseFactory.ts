import { Injectable } from '@nestjs/common';
import ServiceFactory from '../ServiceFactory';
import DeleteTask from './DeleteTask/DeleteTask';
import GetAllTasksUseCase from './GetAllTasks/GetAllTasksUseCase';
import CreateTask from './CreateTask/CreateTask';
import UpdateTask from './UpdateTask/UpdateTask';

type UseCases = GetAllTasksUseCase | DeleteTask | CreateTask | UpdateTask;

@Injectable()
export default class UseCaseFactory extends ServiceFactory<UseCases> { }
