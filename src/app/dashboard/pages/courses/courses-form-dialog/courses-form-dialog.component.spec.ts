import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesFormDialogComponent } from './courses-form-dialog.component';

describe('CoursesFormDialogComponent', () => {
  let component: CoursesFormDialogComponent;
  let fixture: ComponentFixture<CoursesFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesFormDialogComponent]
    });
    fixture = TestBed.createComponent(CoursesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
