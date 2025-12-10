import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailsComponent } from './task-details.component';
import { TaskService } from '../../core/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('TaskDetailsComponent', () => {
    let component: TaskDetailsComponent;
    let fixture: ComponentFixture<TaskDetailsComponent>;
    let taskService: TaskService;
    let router: Router;

    const mockTask = { id: '1', title: 'Test', description: 'Desc', status: 'PENDING', created_at: new Date() };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TaskDetailsComponent,],
            providers: [
                TaskService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { paramMap: { get: () => '1' } }
                    }
                }
            ]
        }).compileComponents();

        taskService = TestBed.inject(TaskService);
        router = TestBed.inject(Router);

        spyOn(taskService, 'getTaskById').and.returnValue(mockTask as any);

        fixture = TestBed.createComponent(TaskDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should fetch task on init', () => {
        expect(component.task).toBeDefined();
        expect(component.task?.id).toBe('1');
        expect(taskService.getTaskById).toHaveBeenCalledWith('1');
    });

    it('should open confirmation modal on delete click', () => {
        component.confirmDelete('1');

        expect(component.showDeleteModal).toBeTrue();
        expect(component.taskIdToDelete).toBe('1');
    });

});