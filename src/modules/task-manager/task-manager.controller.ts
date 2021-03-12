import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  Request,
  Post,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../common/guards';
import { CreateTaskManagerDto } from './dto/create-task-manager.dto';
import { UpdateTaskManagerDto } from './dto/update-task-manager.dto';
import { TaskManagerService } from './task-manager.service';

@ApiTags('Task Manager')
@Controller('task_manager')
export class TaskManagerController {
  constructor(private readonly taskManagerService: TaskManagerService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all task',
    description: 'This will be used to get a list of task',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users fetching successful.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUsers() {
    return await this.taskManagerService.getTasks();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get a user task',
    description: 'This will get the task of user by id that is not completed',
  })
  @ApiResponse({
    status: 200,
    description: 'Task profile fetching successful.',
  })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserById(@Param('id') id: any) {
    return await this.taskManagerService.getTaskById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a user task',
    description: 'This will update the task to completed',
  })
  @ApiResponse({
    status: 200,
    description: 'Task Update successful.',
  })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async UpdateTaskById(
    @Param('id') id: any,
    @Body() updateTaskManagerDto: UpdateTaskManagerDto,
  ) {
    return await this.taskManagerService.UpdateTaskById(
      id,
      updateTaskManagerDto,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Assign Task',
    description: 'This will be used to assign a new task',
  })
  @ApiResponse({ status: 200, description: 'Creating new task successful.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: CreateTaskManagerDto })
  async createUser(@Body() createTaskManagerDto: CreateTaskManagerDto) {
    return await this.taskManagerService.createTask(createTaskManagerDto);
  }
}
