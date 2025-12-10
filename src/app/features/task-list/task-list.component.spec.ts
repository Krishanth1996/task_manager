import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../core/services/task.service';
import { ActivatedRoute } from '@angular/router';

describe('TaskListComponent', () => {
    let component: TaskListComponent;
    let fixture: ComponentFixture<TaskListComponent>;
    let taskService: TaskService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TaskListComponent,],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: (key: string) => '1',
                            },
                        },
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TaskListComponent);
        component = fixture.componentInstance;
        taskService = TestBed.inject(TaskService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update search query in service on input', () => {
        const inputElement = fixture.nativeElement.querySelector('input');
        inputElement.value = 'New Search';
        inputElement.dispatchEvent(new Event('input'));

        expect(taskService.searchQuery()).toBe('New Search');
    });

    it('should open modal when Add button is clicked', () => {
        const addButton = fixture.nativeElement.querySelector('.btn-primary') || fixture.nativeElement.querySelector('.fab-add');
        addButton.click();

        expect(component.isModalOpen).toBeTrue();
    });

    it('should handle pagination', () => {
        taskService.itemsPerPage = 1;

        component.nextPage();

        expect(taskService.currentPage()).toBe(2);
    });
});