
import { IsEnum, IsNotEmpty } from 'class-validator'
import { TaskStatus } from '../task.model'

export class CreateTaskDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string

}


export class UpdateTaskDto {
    title?: string
    description?: string
    status?:TaskStatus}