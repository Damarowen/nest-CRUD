import {  Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { GetTaskFilterDto } from './dto/getTasks.filter.dto';
import { TaskRepository } from './repository/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';

export interface Data {
    id?: number,
    status?: string,
    message?: string,
    data?: any[] | string
}

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) { }



    getAllTasks(filterDto: GetTaskFilterDto): Promise<TaskEntity[]>{
        return this.taskRepository.getTasks(filterDto);

        // const { status, search } = filterDto;
        // let tasks = this.getAllTasks();

        // if (status) {
        //     tasks = tasks.filter(x => x.status === status)
        // }
        // if (search) {
        //     tasks = tasks.filter(x =>
        //         x.title.includes(search) || x.description.includes(search)
        //     )
        // }

        // return {
        //     status: 'succeed',
        //     data: tasks.length > 0 ? tasks : 'no data'
        // }
    }

    async getSingleTask(id: number): Promise<TaskEntity> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with ${id} not found`)
        }

        return found
    }


    createNewTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {

        return this.taskRepository.createTask(createTaskDto);

    }

    updateTask(updateTaskDto: UpdateTaskDto, id: number): Promise<TaskEntity> {

        return this.taskRepository.updateTask(updateTaskDto, id);

    }

    async deleteTask(id: number): Promise<Data> {

        const found = await this.getSingleTask(id)
        await this.taskRepository.delete(found.id)

        const data: Data = {
            id: id,
            message: 'delete'
        }

        return data

    }


}
