import {  TaskStatus } from "../task.model";
import {IsIn, IsOptional, IsNotEmpty} from "class-validator"
export class GetTaskFilterDto {

    @IsIn(Object.values(TaskStatus))
    @IsOptional()
    status: TaskStatus

    @IsOptional()
    @IsNotEmpty()
    search: string
}



