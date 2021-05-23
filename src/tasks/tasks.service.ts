import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { GetTaskFilterDto } from './dto/getTasks.filter.dto';
import { TaskRepository } from './repository/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { UserEntity } from 'src/auth/entity/user.entity';
import { GetUser } from 'src/auth/decorator/getUser.decorator';

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



    getAllTasks(
        filterDto: GetTaskFilterDto,
        @GetUser() user: UserEntity

    ): Promise<TaskEntity[]> {
        return this.taskRepository.getTasks(filterDto, user);

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

    async getSingleTask(
        id: number,
        @GetUser() user: UserEntity

    ): Promise<TaskEntity> {
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });

        if (!found) {
            throw new NotFoundException(`Task with ${id} not found`)
        }

        return found
    }


    createNewTask(
        createTaskDto: CreateTaskDto,
        user: UserEntity
    ): Promise<TaskEntity> {

        return this.taskRepository.createTask(createTaskDto, user);

    }

    updateTask(
        updateTaskDto: UpdateTaskDto,
        id: number,
        @GetUser() user: UserEntity

    ): Promise<TaskEntity> {

        return this.taskRepository.updateTask(updateTaskDto, id, user);

    }

    async deleteTask(
        id: number,
        @GetUser() user: UserEntity

    ): Promise<Data> {

        const res = await this.taskRepository.delete({ id, userId: user.id })

        if (res.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        const data: Data = {
            id: id,
            message: 'delete'
        }

        return data

    }


}
