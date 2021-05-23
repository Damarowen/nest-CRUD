import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

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

}