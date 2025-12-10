import { TaskStatus } from '../../core/models/task.model';

export function formatStatus(status: TaskStatus | string): string {
    switch (status) {
        case 'IN_PROGRESS': return 'In Progress';
        case 'PENDING': return 'Pending';
        case 'DONE': return 'Done';
        default: return status;
    }
}

export function getStatusClass(status: TaskStatus | string): string {
  if (!status) return '';
  return status.toLowerCase().replace(/[\s_]+/g, '-');
}