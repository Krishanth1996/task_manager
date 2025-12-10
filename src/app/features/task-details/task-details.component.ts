import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';
import { TaskModalComponent } from '../../shared/components/task-modal/task-modal.component';
import { formatStatus, getStatusClass } from '../../shared/utils/task.utils';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';


@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, TaskModalComponent, ConfirmationModalComponent],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  location = inject(Location);
  service = inject(TaskService);

  formatStatus = formatStatus;
  getStatusClass = getStatusClass;


  showDeleteModal = false;
  taskIdToDelete: string | null = null;

  task: Task | undefined;
  isModalOpen = false;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.task = this.service.getTaskById(id);
  }

  refreshTask() {
    if (this.task) this.task = this.service.getTaskById(this.task.id);
  }

  deleteTask() {
    if (this.task && confirm('Delete this task?')) {
      this.service.deleteTask(this.task.id);
      this.router.navigate(['/']);
    }
  }

  confirmDelete(id: string) {
    this.taskIdToDelete = id;
    this.showDeleteModal = true;
  }

  onDeleteConfirmed() {
    if (this.taskIdToDelete) {
      this.service.deleteTask(this.taskIdToDelete);
      this.closeDeleteModal();
      this.goBack();
    }
  }

  onDeleteCanceled() {
    this.closeDeleteModal();
  }

  private closeDeleteModal() {
    this.taskIdToDelete = null;
    this.showDeleteModal = false;
  }

  goBack() { this.location.back(); }

}