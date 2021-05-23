import { Body, Controller, Delete, Get, Param, Post, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { GetTaskFilterDto } from './dto/getTasks.filter.dto';
import { Data } from './tasks.service'
import { TaskEntity } from './entity/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator/getUser.decorator';
import { UserEntity } from 'src/auth/entity/user.entity';


//* karena TasksService injectable maka bisa dimasukin disini
@Controller('api/v1/tasks')
@UseGuards(AuthGuard())
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @Get()
    @UsePipes(ValidationPipe)
    getAllTasks(
        @Query() filterDto: GetTaskFilterDto,
        @GetUser() user: UserEntity
        
        ) {
        return this.tasksService.getAllTasks(filterDto, user);
    }

    @Get('/:id')
    getSingleTask(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: UserEntity
        ): Promise<TaskEntity> {
        return this.tasksService.getSingleTask(id, user);
    }


    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: UserEntity

    ): Promise<TaskEntity> {
        return this.tasksService.createNewTask(createTaskDto, user);
    }

    @Patch('/:id/status')
    @UsePipes(ValidationPipe)
    updateTask(
        @Param('id') id: number,
        @Body() updateTaskDto: UpdateTaskDto,
        @GetUser() user: UserEntity
    ): Promise<TaskEntity> {
        return this.tasksService.updateTask(updateTaskDto, id, user);
    }


    @Delete('/:id')
    deleteTask(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: UserEntity
        ): Promise<Data> {
        return this.tasksService.deleteTask(id, user)
    }

}