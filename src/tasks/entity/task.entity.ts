import { UserEntity } from 'src/auth/entity/user.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from '../task.model';

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  //* generate serial auto increment
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(() => UserEntity, user => user.tasks, { eager: false })
  user: UserEntity;

  
  @Column()
  userId: number;
}