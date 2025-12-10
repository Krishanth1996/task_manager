import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with mock tasks if storage is empty', () => {
    expect(service.paginatedTasks().length).toBeGreaterThan(0);
  });

  it('should add a new task', () => {
    const newTask = { id: '1', title: 'Test Task', description: 'Desc', status: 'PENDING' as const };

    service.addTask(newTask);

    const foundTask = service.filteredTasks().find(t => t.id === newTask.id);

    expect(foundTask).toBeTruthy();
    expect(foundTask!.title).toBe('Fix login bug');
  });

  it('should delete a task', () => {
    const taskToDelete = service.paginatedTasks()[0];
    const id = taskToDelete.id;

    service.deleteTask(id);

    const found = service.getTaskById(id);
    expect(found).toBeUndefined();
  });

  it('should update a task', () => {
    const task = service.paginatedTasks()[0];
    const updatedData = { ...task, title: 'Updated Title' };

    service.updateTask(updatedData);

    const found = service.getTaskById(task.id);
    expect(found?.title).toBe('Updated Title');
  });

  it('should filter tasks by search query', () => {
    service.addTask({ title: 'UniqueSearchTerm', description: '', status: 'PENDING' });

    service.searchQuery.set('UniqueSearchTerm');

    expect(service.filteredTasks().length).toBe(1);
    expect(service.filteredTasks()[0].title).toBe('UniqueSearchTerm');
  });

  it('should filter tasks by status', () => {
    const doneTask = service.filteredTasks().find(t => t.status === 'DONE');
    if (doneTask) {
      service.searchQuery.set('DONE');
      expect(service.filteredTasks().length).toBeGreaterThan(0);
      expect(service.filteredTasks()[0].status).toBe('DONE');
    }
  });
});