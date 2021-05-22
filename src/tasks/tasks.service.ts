import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model'
import { v1 as uuid } from 'uuid';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
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
        const found = this.tasks.find(item => item.id === id)

        if (!found) {
            throw new NotFoundException(`Task with ${id} not found`)
        }

        return found
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
        const task = this.getSingleTask(id);
        const { title, description, status } = updateTaskDto;

        if (title) {
            task.title = title;
        }
        if (description) {
            task.description = description;
        }
        if (status) {

            // const statusOk = status.toUpperCase()
            // if (!Object.values(TaskStatus).find(x => x === statusOk)) {
            //     throw new BadRequestException(`${status} is an invalid status`);
            // }

            task.status = status.toUpperCase() as TaskStatus;
        }

        return task;
    }

    deleteTask(id: string) {

        const found = this.getSingleTask(id)
        this.tasks = this.tasks.filter(item => item.id !== found.id)

        const data: Data = {
            id: id,
            message: 'delete'
        }

        return data

    }


}
