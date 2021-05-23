import { TaskEntity } from 'src/tasks/entity/task.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';

@Entity()
@Unique((['username']))
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  //* generate serial auto increment
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => TaskEntity, task => task.user, { eager: true })
  tasks: TaskEntity[];

}