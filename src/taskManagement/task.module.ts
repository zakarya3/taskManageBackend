import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), UsersModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
