
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { TaskEntity } from '../entity/task.entity'
import { TaskStatus } from '../task.model';
import { GetTaskFilterDto } from '../dto/getTasks.filter.dto';
import { UserEntity } from 'src/auth/entity/user.entity';
import { GetUser } from 'src/auth/decorator/getUser.decorator';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {

  async getTasks(
    filterDto: GetTaskFilterDto,
    @GetUser() user: UserEntity
    
    ): Promise<TaskEntity[]> {

    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    //*This way nestjs/typeorm will translate the task.user.id to task.userId when compiling to raw SQL.
    //query.andWhere('task.user.id = :userId', {userId: user.id});

    //*This way typeorm makes all the magic for us and automatically uses the auto-generated userId column to match it with user.id.
    query.where({ user })

    if (status) {
      //* :status is variabel
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      //* %${search}% is variabel to search partial
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
    }

    const tasks = await query.getMany();
    return tasks;
  }



  async createTask(createTaskDto: CreateTaskDto, user: UserEntity): Promise<TaskEntity> {
    const { title, description } = createTaskDto;

    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user
    await task.save();
    delete task.user;
    return task;
  }


  async updateTask(updateTaskDto: UpdateTaskDto, id: number,  user: UserEntity): Promise<TaskEntity> {

    const task = await TaskEntity.findOne({ where: { id, userId: user.id } })
    if (!task) {
      throw new NotFoundException(`Task with ${id} not found`)
    }


    const { title, description, status } = updateTaskDto;

    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    if (status) {

      const statusOk = status.toUpperCase()
      if (!Object.values(TaskStatus).find(x => x === statusOk)) {
        throw new BadRequestException(`${status} is an invalid status`);
      }

      task.status = status.toUpperCase() as TaskStatus;
    }

    await task.save()
    return task;
  }
}