import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model'

//* karena TasksService injectable maka bisa dimasukin disini
@Controller('tasks')
export class TasksController {
    
    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(
        //* tile and description is key
        @Body('title') title: string,
        @Body('description') description: string
    ): Task {
        return this.tasksService.createNewTask(title,description);
    }
}