import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model'
import { CreateTaskDto, UpdateTaskDto } from './dto/createTask.dto';
import { GetTaskFilterDto } from './dto/getTasks.filter.dto';
import { Data } from './tasks.service'


//* karena TasksService injectable maka bisa dimasukin disini
@Controller('api/v1/tasks')
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @Get()
    getAllTasks(@Query() filterDto: GetTaskFilterDto ) {
        if(Object.keys(filterDto).length){
            return this.tasksService.getFilteredTask(filterDto);
        }
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getSingleTask(@Param('id') id: string): Task {
        return this.tasksService.getSingleTask(id);
    }


    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createNewTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
       return this.tasksService.updateTask(updateTaskDto, id)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): Data {
        return this.tasksService.deleteTask(id)
    }

}