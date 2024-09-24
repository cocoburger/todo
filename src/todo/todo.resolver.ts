import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from '../entities/todo.entity';
import { UpdateTodoInput } from './dto/update-todo.input';
import { CreateTodoInput } from './dto/create-todo.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo])
  todos(): Todo[] {
    return this.todoService.findAll();
  }

  @Query(() => Todo)
  todo(@Args('id', { type: () => ID }) id: string) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo)
  updateTodo(
    @Args('id') id: string,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ): Todo {
    return this.todoService.update(id, updateTodoInput);
  }

  @Mutation(() => Boolean)
  removeTodo(@Args('id', { type: () => ID }) id: string) {
    return this.todoService.remove(id);
  }
}
