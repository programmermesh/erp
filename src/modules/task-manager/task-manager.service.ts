import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e = require('express');
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateTaskManagerDto } from './dto/create-task-manager.dto';
import { UpdateTaskManagerDto } from './dto/update-task-manager.dto';
import { TaskManagerEntity as User } from './task-manager.entity';

@Injectable()
export class TaskManagerService {
  constructor(
    @InjectRepository(User) private readonly taskRepo: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  private logger = new Logger('TaskManagerService');

  getTasks(): Promise<User[]> {
    return this.taskRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getTaskById(id: any) {
    const userFound = await this.taskRepo.findOne({ assign_to: id });
    if (userFound.is_completed == false) {
      return {
        user: userFound,
        ResponseCode: '00',
        ResponseDescription: 'Succesfully',
      };
    } else if (userFound.is_completed == true) {
      return {
        ResponseCode: '00',
        ResponseDescription: 'No pending task',
      };
    } else {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  async UpdateTaskById(id: any, userDate: UpdateTaskManagerDto) {
    const userFound = await this.taskRepo.findOne({ id });
    if (!userFound) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    } else {
      const task = await this.taskRepo.update(id, userDate);
    }
  }

  async createTask(userData: CreateTaskManagerDto) {
    const user = this.taskRepo.create(userData);
    await this.taskRepo.save(user);
    return {
      user: user,
      ResponseCode: '00',
      ResponseDescription: 'Task created succesfully',
    };
  }
}
