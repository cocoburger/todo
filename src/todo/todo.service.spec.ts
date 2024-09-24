import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', () => {
      //Given
      const createTodoInput: CreateTodoInput = {
        id: '1',
        title: 'Test Todo',
        description: 'Test description',
        targetDate: new Date(),
      };

      //When
      const result = service.create(createTodoInput);

      //Then
      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: 'Test Todo',
          description: 'Test description',
          targetDate: expect.any(Date),
          completed: false,
        }),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array todos', () => {
      //given

      const createTodoInput: CreateTodoInput = {
        id: '1',
        title: 'Test Todo',
        description: 'Test Description',
        targetDate: new Date(),
      };
      service.create(createTodoInput);

      const result = service.findAll();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toEqual(
        expect.objectContaining({
          id: '1',
          title: 'Test Todo',
          description: 'Test Description',
        }),
      );
    });
  });

  describe('findOne', () => {
    it('should return a todo by id', () => {
      // Given
      const createTodoInput: CreateTodoInput = {
        id: '1',
        title: 'Test Todo',
        description: 'Test Description',
        targetDate: new Date(),
      };
      const createdTodo = service.create(createTodoInput);

      // When
      const result = service.findOne(createdTodo.id);

      // Then
      expect(result).toEqual(
        expect.objectContaining({
          id: createdTodo.id,
          title: 'Test Todo',
          description: 'Test Description',
        }),
      );
    });

    it('should return undefined for non-existent id', () => {
      // Given
      const nonExistentId = 'non-existent-id';

      // When
      const result = service.findOne(nonExistentId);

      // Then
      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a todo', () => {
      // Given
      const createTodoInput: CreateTodoInput = {
        id: '1',
        title: 'Test Todo',
        description: 'Test Description',
        targetDate: new Date(),
      };
      const createdTodo = service.create(createTodoInput);
      const updateTodoInput: UpdateTodoInput = {
        title: 'Updated Todo',
        description: 'Update Description',
        completed: true,
      };

      // When
      const result = service.update(createdTodo.id, updateTodoInput);

      // Then
      expect(result).toEqual(
        expect.objectContaining({
          id: createdTodo.id,
          title: 'Updated Todo',
          description: 'Update Description',
          completed: true,
          updatedAt: expect.any(Date),
        }),
      );
      expect(result.createdAt).toEqual(expect.any(Date));
      expect(result.targetDate).toEqual(expect.any(Date));
    });
  });

  describe('remove', () => {
    it('should remove a todo', () => {
      // Given
      const createTodoInput: CreateTodoInput = {
        id: '1',
        title: 'Test Title',
        description: 'Test Description',
        targetDate: new Date(),
      };
      // When
      const createdTodo = service.create(createTodoInput);
      const result = service.remove(createdTodo.id);

      // Then
      expect(result).toBe(true);
      expect(service.findOne(createdTodo.id)).toBeUndefined();
    });

    it('should return false for non-existent id', () => {
      // Given
      const nonExistentId = 'non-existent-id';

      // When
      const result = service.remove(nonExistentId);

      // Then
      expect(result).toBe(false);
    });
  });
});
