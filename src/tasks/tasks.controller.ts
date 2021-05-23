import { Body, Controller, Delete, Get, Param, Post, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { GetTaskFilterDto } from './dto/getTasks.filter.dto';
import { Data } from './tasks.service'
import { TaskEntity } from './entity/task.entity';


//* karena TasksService injectable maka bisa dimasukin disini
@Controller('api/v1/tasks')
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @Get()
    @UsePipes(ValidationPipe)
    getAllTasks(@Query() filterDto: GetTaskFilterDto ) {
        return this.tasksService.getAllTasks(filterDto);
    }

    @Get('/:id')
    getSingleTask(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
        return this.tasksService.getSingleTask(id);
    }


    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        return this.tasksService.createNewTask(createTaskDto);
    }

    @Patch('/:id/status')
    @UsePipes(ValidationPipe)
    updateTask(
      @Param('id') id: number,
      @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<TaskEntity>  {
      return this.tasksService.updateTask(updateTaskDto, id);
    }
  

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<Data> {
        return this.tasksService.deleteTask(id)
    }

}