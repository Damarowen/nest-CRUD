import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model'
import { v1 as uuid } from 'uuid';
import { CreateTaskDto, UpdateTaskDto } from './dto/createTask.dto';
import { GetTaskFilterDto } from './dto/getTasks.filter.dto';

export interface Data {
    id?: string,
    status?: string,
    message?: string,
    data?: any[] | string
}

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks
    }

    getFilteredTask(filterDto: GetTaskFilterDto): Data {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(x => x.status === status)
        }
        if (search) {
            tasks = tasks.filter(x =>
                x.title.includes(search) || x.description.includes(search)
            )
        }

        return {
            status: 'succeed',
            data: tasks.length > 0 ? tasks : 'no data'
        }
    }

    getSingleTask(id: string): Task {
        return this.tasks.find(item => item.id === id)

    }

    createNewTask(createTaskDto: CreateTaskDto): Task {

        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task);
        return task;
    }

    updateTask(updateTaskDto: UpdateTaskDto, id: string): Task {

        const task = this.getSingleTask(id)
        const { title, status, description } = updateTaskDto;

        task.status = status;
        task.title = title;
        task.description = description;

        return task

    }

    deleteTask(id: string) {
        this.tasks = this.tasks.filter(item => item.id !== id)

        const data: Data = {
            id: id,
            message: 'delete'
        }

        return data

    }


}
