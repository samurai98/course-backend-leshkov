import { Controller, UseGuards } from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { Todo } from '../entities/todo.entity';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
} from '@nestjsx/crud';
import { CreateDto, UpdateDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Crud({
  model: {
    type: Todo,
  },
  routes: {
    // 'getManyBase' | 'getOneBase' | 'createOneBase' | 'createManyBase' |
    // 'updateOneBase' | 'replaceOneBase' | 'deleteOneBase'
    exclude: [],
    only: [],
  },
  dto: {
    create: CreateDto,
    update: UpdateDto,
  }
})


@ApiTags('todo')
@UseGuards(AuthGuard('jwtAdmin'))
@Controller('todo')
export class TodoController implements CrudController<Todo> {
  constructor(public service: TodoService) {
  }
}
