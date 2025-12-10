import { Routes } from '@angular/router';
import { TaskListComponent } from './features/task-list/task-list.component';
import { TaskDetailsComponent } from './features/task-details/task-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: TaskListComponent
  },
  {
    path: 'tasks/:id',
    component: TaskDetailsComponent
  }
];