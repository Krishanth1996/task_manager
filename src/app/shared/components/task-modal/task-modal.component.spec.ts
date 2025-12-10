import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskModalComponent } from './task-modal.component';
import { TaskService } from '../../../core/services/task.service';

describe('TaskModalComponent', () => {
  let component: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModalComponent],
      providers: [TaskService]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskModalComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
  });

  it('should initialize form invalid (because title is required)', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should be valid when title is entered', () => {
    component.form.controls['title'].setValue('Valid Title');
    expect(component.form.valid).toBeTrue();
  });

  it('should call service.addTask on save when in create mode', () => {
    spyOn(taskService, 'addTask');
    spyOn(component.close, 'emit');

    component.form.controls['title'].setValue('New Task');
    component.form.controls['status'].setValue('PENDING');

    component.save();

    expect(taskService.addTask).toHaveBeenCalled();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should call service.updateTask on save when in edit mode', () => {
    spyOn(taskService, 'updateTask');
    
    component.taskToEdit = { id: '1', title: 'Old', description: '', status: 'PENDING', created_at: new Date() };
    component.ngOnInit(); 

    component.form.controls['title'].setValue('New Title');
    component.save();

    expect(taskService.updateTask).toHaveBeenCalled();
  });
});