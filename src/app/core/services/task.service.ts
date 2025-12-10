import { Injectable, signal, computed, effect } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly STORAGE_KEY = 'tasks_manager_storage_key';
  private tasks = signal<Task[]>(this.loadFromStorage());
  public searchQuery = signal<string>('');
  public sortOption = signal<'Title' | 'Date'>('Title');
  public currentPage = signal<number>(1);
  public itemsPerPage = 4;

  constructor() {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    });
  }
  public filteredTasks = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const tasks = this.tasks();

    let result = tasks.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.status.toLowerCase().includes(query)
    );

    const sort = this.sortOption();
    result = result.sort((a, b) => {
      if (sort === 'Title') return a.title.localeCompare(b.title);
      return b.created_at.getTime() - a.created_at.getTime();
    });

    return result;
  });

  public paginatedTasks = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredTasks().slice(start, start + this.itemsPerPage);
  });

  public totalPages = computed(() =>
    Math.ceil(this.filteredTasks().length / this.itemsPerPage)
  );

  getTaskById(id: string): Task | undefined {
    return this.tasks().find(t => t.id === id);
  }

  addTask(task: Omit<Task, 'id' | 'created_at'>) {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      created_at: new Date()
    };
    this.tasks.update(current => [newTask, ...current]);
  }

  updateTask(updatedTask: Task) {
    this.tasks.update(current =>
      current.map(t => t.id === updatedTask.id ? updatedTask : t)
    );
  }

  deleteTask(id: string) {
   return this.tasks.update(current => current.filter(t => t.id !== id));
  }

  private getMockTasks(): Task[] {
    return [
      { id: '1', title: 'Fix login bug', description: 'Users unable to log in', status: 'DONE', created_at: new Date() },
      { id: '2', title: 'Implement search', description: 'Add search bar', status: 'IN_PROGRESS', created_at: new Date() },
      { id: '3', title: 'Update documentation', description: 'Update readme', status: 'PENDING', created_at: new Date() },
      { id: '4', title: 'Design review', description: 'Review mockups', status: 'PENDING', created_at: new Date() },
      { id: '5', title: 'API Integration', description: 'Connect to backend', status: 'IN_PROGRESS', created_at: new Date() },
    ];
  }

  private loadFromStorage(): Task[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((t: any) => ({
        ...t,
        created_at: new Date(t.created_at)
      }));
    }
    return this.getMockTasks();
  }
}