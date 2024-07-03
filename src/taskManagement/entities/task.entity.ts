import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { status_enum } from '../enums/enums';
import { UserEntity } from 'src/users/entities/users.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ enum: status_enum })
  status: status_enum;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { eager: true })
  user: UserEntity;
}
