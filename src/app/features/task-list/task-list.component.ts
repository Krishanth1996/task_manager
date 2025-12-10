import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { TaskModalComponent } from '../../shared/components/task-modal/task-modal.component';
import { formatStatus, getStatusClass } from '../../shared/utils/task.utils';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TaskModalComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  taskService = inject(TaskService);

  formatStatus = formatStatus;
  getStatusClass = getStatusClass;


  isModalOpen = false;


  get pageNumbers(): number[] {
    const total = this.taskService.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  }


  onSearch(e: Event) {
    const target = e.target as HTMLInputElement;
    this.taskService.searchQuery.set(target.value);
  }

  onSort(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.taskService.sortOption.set(target.value as 'Title' | 'Date');
  }

  goToPage(page: number) {
    this.taskService.currentPage.set(page);
  }

  nextPage() {
    if (this.taskService.currentPage() < this.taskService.totalPages()) {
      this.taskService.currentPage.update(p => p + 1);
    }
  }

 

}