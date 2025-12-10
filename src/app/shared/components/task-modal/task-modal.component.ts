import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {
  @Input() taskToEdit: Task | null = null;
  @Output() close = new EventEmitter<void>();

  fb = inject(FormBuilder);
  service = inject(TaskService);
  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.taskToEdit?.title || '', Validators.required],
      description: [this.taskToEdit?.description || ''],
      status: [this.taskToEdit?.status || 'Pending']
    });
  }

  save() {
    if (this.form.invalid) return;
    
    if (this.taskToEdit) {
      this.service.updateTask({ ...this.taskToEdit, ...this.form.value });
    } else {
      this.service.addTask(this.form.value);
    }
    this.close.emit();
  }
}