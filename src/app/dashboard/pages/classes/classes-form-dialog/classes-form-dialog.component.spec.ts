import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesFormDialogComponent } from './classes-form-dialog.component';

describe('ClassesFormDialogComponent', () => {
  let component: ClassesFormDialogComponent;
  let fixture: ComponentFixture<ClassesFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesFormDialogComponent]
    });
    fixture = TestBed.createComponent(ClassesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
