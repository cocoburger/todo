import { Injectable } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTodoInput } from './dto/update-todo.input';
import { CreateTodoInput } from './dto/create-todo.input';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  private removeUndefinedAndNull(obj: any): any {
    return Object.entries(obj)
      .filter(([_, v]) => v != null)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo {
    return this.todos.find((todo) => todo.id === id);
  }

  create(createTodoInput: CreateTodoInput) {
    const todo: Todo = {
      id: uuidv4(),
      ...createTodoInput,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.todos.push(todo);
    return todo;
  }

  update(id: string, updateTodoInput: UpdateTodoInput): Todo {
    const todo = this.findOne(id);
    if (todo) {
      Object.assign(todo, this.removeUndefinedAndNull(updateTodoInput));
    }
    return todo;
  }

  remove(id: string) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      return true;
    }
    return false;
  }
}
