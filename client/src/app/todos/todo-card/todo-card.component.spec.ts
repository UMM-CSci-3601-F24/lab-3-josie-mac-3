import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TodoCardComponent } from './todo-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

import { Todo } from '../todo';

describe('TodoCardComponent', () => {
  let component: TodoCardComponent;
  let fixture: ComponentFixture<TodoCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatCardModule, TodoCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCardComponent);
    component = fixture.componentInstance;
    const todo: Todo = {
      _id: 'chris_id',
      owner: 'Chris',
      category: "ChristTasks",
      body: 'wompers',
      status: true,
    };
    // This is a semi-weird hack to get around the (current) inability to write to input
    // signals. Hopefully once that is fixed, we should be able to do something more like
    // the commented out version below. I found this StackOverflow post helpful:
    // https://stackoverflow.com/questions/77838277/how-to-initialise-angular-components-with-signal-inputs-from-test
    fixture.componentRef.setInput('todo', todo);
    // component.todo = input(todo);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
